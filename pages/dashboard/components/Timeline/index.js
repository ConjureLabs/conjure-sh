import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore, connect } from '../../../../shared/ReStore';
import classnames from 'classnames';
import moment from 'moment';

import Loader from '../../../../components/Loader';

const exprAllSpaces = /\s/g;

// in seconds
const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;

class Timeline extends Component {
  componentDidMount() {
    // forcing timestamps to update every 2 minutes
    setInterval(() => {
      this.forceUpdate();
    }, 2 * 60 * 1000);
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

      switch (item.status) {
        case 'Spinning Up':
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

        if (item.status === 'Spun Down') {
          duration = `Ran ${duration}`;
        } else {
          duration = `Up for ${duration}`;
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

  render() {
    const timelinePrepared = this.prepareTimeline();

    if (!Array.isArray(timelinePrepared)) {
      return (
        <div className={classes.loader}>
          <Loader />

          <span className={classes.text}>hang tight</span>

          {styles}
        </div>
      );
    }

    return (
      <div className={classes.wrap}>
        {
          timelinePrepared.map(item => {
            const statusNode = item.status === 'Running' ? (
              <a
                href={item.url}
                target='_blank'
              >
                Running
              </a>
            ) : item.status;

            return (
              <ol key={item.id}>
                <li className={classnames(classes.status, classes[item.statusKey])}>
                  <sup />
                  {statusNode}
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
            );
          })
        }

        {styles}
      </div>
    );
  }
};

const selector = store => {
  return {
    timeline: store.timeline,
    org: store.org
  };
};

export default connect(selector)(Timeline);
