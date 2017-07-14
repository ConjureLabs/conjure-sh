import { Component } from 'react';
import { get } from '../../shared/xhr';
import actions from './actions';
import styles, { classes } from './styles.js';
import { ReStore, connect } from '../../shared/ReStore';
import config from '../../shared/config.js';

import Header from '../../components/Header';
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
    this.pullTimeline();
  }

  pullTimeline(dispatchMethod) {
    const { dispatch } = this.props;

    get(`${config.app.api.url}/api/org/${this.orgDropdown.value}/containers/timeline`, {
      page: 0
    }, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        return;
      }

      dispatch.pushTimeline({
        addition: data.timeline
      });
    });
  }

  onDropdownChange() {
    const { dispatch } = this.props;
    dispatch.clearTimeline();
    this.pullTimeline();
  }

  render() {
    const { orgs } = this.props;

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

        <Timeline />

        {styles}
      </div>
    );
  }
}

const selector = store => {
  return {
    timeline: store.timeline
  };
};

const ConnectedDashboard = connect(selector)(Dashboard);

const PageContent = ({ url, children }) => {
  // todo: avoid using props.url.query?
  const { account, orgs } = url.query;

  const initialState = {
    account,
    timeline: null
  };

  return (
    <ReStore store={initialState} actions={actions}>
      <ConnectedDashboard orgs={orgs} />
    </ReStore>
  );
};

export default PageContent;
