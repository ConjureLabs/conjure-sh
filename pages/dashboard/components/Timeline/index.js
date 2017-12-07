import { Component } from 'react';
import styles, { classes } from './styles.js';
import { connect } from 'federal';
import EmptyState from '../../../../components/EmptyState';
import classnames from 'classnames';
import moment from 'moment';

const exprAllSpaces = /\s/g;

// in seconds
const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;

class Timeline extends Component {
  constructor(props) {
    super(props);

    // for interval reference tracking
    this.intervals = {};
  }

  componentDidMount() {
    // forcing timestamps to update every 2 minutes
    this.intervals.forcedUpdate = setInterval(() => {
      this.forceUpdate();
    }, 2 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervals.forcedUpdate);
  }

  prepareTimeline() {
    const { timeline, org } = this.props;

    if (timeline === null) {
      return null;
    }

    // generate some extra fields
    return timeline.map(item => {
      const statusKey = item.status.replace(exprAllSpaces, '').toLowerCase();

      let ms;
      let duration;

      findDuration: {
        switch (item.status) {
          case 'Spinning Up':
            duration = '-';
            break findDuration;

          case 'Running':
            ms = new Date() - new Date(item.start);
            break;

          case 'Spun Down':
            ms = new Date(item.stop) - new Date(item.start);
            break;
        }

        if (typeof ms === 'number') {
          let remainingSeconds = Math.ceil(ms / 1000);
          let durationDays = Math.floor(remainingSeconds / day);
          remainingSeconds %= day;
          let durationHours = Math.floor(remainingSeconds / hour);
          remainingSeconds %= hour;
          let durationMinutes = Math.floor(remainingSeconds / minute);
          let durationSeconds = remainingSeconds % minute;

          if (durationDays === 0 && durationHours === 0 && durationMinutes === 0) {
            duration = `${durationSeconds} second${durationSeconds === 1 ? '' : 's'}`;
          } else if (durationDays === 0 && durationHours === 0) {
            duration = minute / 2 < durationSeconds ? `${durationMinutes + 1} minutes` : `${durationMinutes} minute${durationMinutes === 1 ? '' : 's'}`;
          } else if (durationDays === 0) {
            duration = hour / 2 < (durationMinutes * minute) ? `${durationHours + 1} hours` : `${durationHours} hour${durationHours === 1 ? '' : 's'}`;
          } else {
            duration = day / 2 < (durationHours * hour) ? `${durationDays + 1} days` : `${durationDays} day${durationDays === 1 ? '' : 's'}`;
          }
        }
      }

      return Object.assign({}, item, {
        statusKey,
        duration,
        repoUrl: `https://github.com/${org}/${item.repo}/`,
        branchUrl: `https://github.com/${org}/${item.repo}/tree/${item.branch}`
      });
    });
  }

  mockRender() {
    const filler = ['Today', null, null, null, 'Yesterday', null, null];

    const fillerContent = filler.map((dayHeaderText, i) => {
      return (
        <article key={`filler-${i}`}>
          {
            dayHeaderText === null ? null : (
              <header>
                <ol>
                  <li className={classes.status}>{dayHeaderText}</li>
                  <li className={classes.logs}></li>
                  <li className={classes.repo}>Repo</li>
                  <li className={classes.branch}>Branch</li>
                  <li className={classes.duration}>Duration</li>
                </ol>
              </header>
            )
          }

          <ol>
            <li className={classnames(classes.status, classes.spundown)}>
              <sup />
              <del />
            </li>

            <li className={classes.logs}></li>

            <li className={classes.repo}>
              <sup className={classes.svgIcon} />
              <del />
            </li>

            <li className={classes.branch}>
              <sup className={classes.svgIcon} />
              <del />
            </li>

            <li className={classes.duration}>
              <del />
            </li>
          </ol>
        </article>
      );
    });

    return (
      <div className={classnames(classes.wrap, classes.filler)}>
        {fillerContent}
        {styles}
      </div>
    );
  }

  render() {
    const timelinePrepared = this.prepareTimeline();
    
    if (!Array.isArray(timelinePrepared)) {
      return this.mockRender();
    }

    if (!timelinePrepared.length) {
      return (
        <div className={classes.wrap}>
          <EmptyState
            className={classes.emptyState}
            emoji='🤖'
            headerText={`There's no activity yet`}
            bodyText='Containers will spin up automatically whenever you create a Pull Request in GitHub'
          />

          <span className={classes.subtext}>Make sure you have added the <a href='/docs/configuration'>Conjure YML config file</a> to your project</span>

          {styles}
        </div>
      );
    }

    // `day` is in seconds, need it in ms
    const dayMs = day * 1000;

    // setting timeline date header to tomorrow, so that it triggers on first pass
    let headerDay = new Date();
    headerDay.setDate(headerDay.getDate() + 1);
    // converting date object to number of days
    // `day` is in seconds, need to convert to ms
    headerDay = Math.floor(headerDay / dayMs);

    const today = Math.floor(new Date() / dayMs);
    const yesterday = today - 1;

    return (
      <div className={classes.wrap}>
        {
          timelinePrepared.map(item => {
            // check if we should inject a new date header
            let dateHeader;
            const itemStartDay = Math.floor(new Date(item.start) / dayMs);

            if (itemStartDay !== headerDay) {
              headerDay = itemStartDay;
              dateHeader = (
                <header key={`day-${headerDay}`}>
                  <ol>
                    <li className={classes.status}>
                      {
                        headerDay === today ? 'Today' :
                          headerDay === yesterday ? 'Yesterday' :
                          moment(new Date(headerDay * dayMs)).format('ll')
                      }
                    </li>
                    <li className={classes.logs} />
                    <li className={classes.repo}>Repo</li>
                    <li className={classes.branch}>Branch</li>
                    <li className={classes.duration}>Duration</li>
                  </ol>
                </header>
              );
            }

            // if container is running, link to it
            const statusNode = item.status === 'Running' ? (
              <a
                key={`running-instance-${item.id}`}
                target='_blank'
                href={item.view}
              >
                View
              </a>
            ) : item.status;

            // if container is running, link to logs
            const logsNode = item.status === 'Running' ? (
              <a
                key={`running-logs-${item.id}`}
                target='_blank'
                href={item.logs}
                className={classes.viewLogs}
              >
                Logs
              </a>
            ) : (' ');

            return (
              <article key={item.id}>
                {dateHeader}

                <ol>
                  <li className={classnames(classes.status, classes[item.statusKey])}>
                    <sup />
                    {statusNode}
                  </li>

                  <li className={classes.logs}>
                    {logsNode}
                  </li>

                  <li className={classnames({
                    [classes.repo]: true,
                    [classes.privateRepo]: item.repo_private === true
                  })}>
                    <sup className={classes.svgIcon} />
                    <a
                      href={item.repoUrl}
                      target='_blank'
                    >
                      {item.repo}
                    </a>
                  </li>

                  <li className={classes.branch}>
                    <sup className={classes.svgIcon} />
                    <a
                      href={item.branchUrl}
                      target='_blank'
                    >
                      {item.branch}
                    </a>
                  </li>

                  <li className={classes.duration}>
                    {item.duration}
                  </li>
                </ol>
              </article>
            );
          })
        }

        {styles}
      </div>
    );
  }
}

const selector = store => ({
  timeline: store.timeline,
  org: store.org
});

export default connect(selector)(Timeline);
