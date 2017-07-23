import { Component } from 'react';
import { get } from '../../shared/xhr';
import actions from './actions';
import styles, { classes } from './styles.js';
import { ReStore, connect } from '../../shared/ReStore';
import config from '../../shared/config.js';
import classnames from 'classnames';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Timeline from './components/Timeline';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // set at render
    this.orgDropdown = null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch.clearTimeline();
    this.onDropdownChange();
  }

  pullTimeline(apiUrl = `${config.app.api.url}/api/org/${this.orgDropdown.value}/containers/timeline`, apiArgs = { page: 0 }) {
    const { dispatch } = this.props;

    get(apiUrl, apiArgs, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        return;
      }

      dispatch.pushTimeline({
        addition: data.timeline,
        pagingHref: data.paging.next
      });

      this.queueDeltaCheck(data.delta);
    });
  }

  queueDeltaCheck(deltaUrl) {
    setTimeout(() => {
      this.checkDelta(deltaUrl);
    }, 30 * 1000);
  }

  checkDelta(deltaUrl) {
    get(deltaUrl, null, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        return;
      }

      if (data.count === 0) {
        return this.queueDeltaCheck(deltaUrl);
      }

      const { timeline } = this.props;

      if (!timeline.length) {
        return this.pullTimeline();
      }

      const { dispatch } = this.props;

      dispatch.setTimelineDelta({
        timelineDela: data.count
      });

      this.queueDeltaCheck();
    });
  }

  onDropdownChange() {
    const { dispatch } = this.props;
    dispatch.setOrg({
      org: this.orgDropdown.value
    });
    this.pullTimeline();
  }

  render() {
    const { orgs, pagingHref, timelineDela } = this.props;

    return (
      <div>
        <Header>
          <span className={classes.headerContent}>
            <select
              ref={ref => this.orgDropdown = ref}
              onChange={this.onDropdownChange.bind(this)}
            >
              {orgs.map(org => {
                return (
                  <option
                    value={org.login}
                    key={org.id}
                  >
                    {org.login}
                  </option>
                );
              })}
            </select>
          </span>
        </Header>

        <span>Timeline delta is {timelineDela}</span>

        <Timeline />

        {!pagingHref ? null : (
          <div className={classnames(classes.wrap, classes.paging)}>
            <Button
              size='small'
              color='blue'
              hallow={true}
              onClick={() => {
                this.pullTimeline(pagingHref, null);
              }}
            >
              View More
            </Button>
          </div>
        )}

        {styles}
      </div>
    );
  }
}

const selector = store => {
  return {
    timeline: store.timeline,
    pagingHref: store.pagingHref,
    timelineDela: store.timelineDela
  };
};

const ConnectedDashboard = connect(selector)(Dashboard);

const PageContent = ({ url, children }) => {
  // todo: avoid using props.url.query?
  const { account, orgs } = url.query;

  const initialState = {
    account,
    org: null,
    pagingHref: null,
    timeline: null
  };

  return (
    <ReStore store={initialState} actions={actions}>
      <ConnectedDashboard orgs={orgs} />
    </ReStore>
  );
};

export default PageContent;
