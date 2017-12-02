import { Component } from 'react';
import { get } from '../../shared/xhr';
import actions from './actions';
import styles, { classes } from './styles.js';
import { connect } from 'federal';
import config from '../../shared/config.js';
import classnames from 'classnames';

import Layout from '../../components/Layout';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Timeline from './components/Timeline';

let activelyPullingDelta = false;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // set at render
    this.orgDropdown = null;
    this.repoDropdown = null;

    // for setTimeout reference tracking
    this.timeouts = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch.clearTimeline(null, () => {
      this.pullTimeline();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeouts.deltaCheck);
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

  pullTimelineDelta() {
    if (activelyPullingDelta === true) {
      return;
    }

    activelyPullingDelta = true;

    const { dispatch, timeline, timelineDelta } = this.props;
    const deltaFetched = [];

    const finish = () => {
      dispatch.clearTimelineDelta({}, () => {
        activelyPullingDelta = false;

        // should be not possible
        if (deltaFetched.length === 0) {
          return;
        }

        dispatch.unshiftTimeline({
          addition: deltaFetched
        });
      });
    };

    // todo: the 32 should be configured
    const pullNext = (apiUrl = `${config.app.api.url}/api/org/${this.orgDropdown.value}/containers/timeline`, apiArgs = { page: 0 }) => {
      // apiUrl should not be null, but will assume done if it is, anyway
      if (apiUrl === null || deltaFetched.length >= timelineDelta) {
        return finish();
      }

      get(apiUrl, apiArgs, (err, data) => {
        if (err) {
          console.error(err);
          alert(err.message);
          activelyPullingDelta = false;
          return;
        }

        for (let i = 0; i < data.timeline.length; i++) {
          // assuming at least one timeline state record, since pullNext should not be able to be called otherwise
          if (data.timeline[i].id === timeline[0].id) {
            return finish();
          }
          deltaFetched.push(data.timeline[i]);
        }

        // must have more rows to pull, so kicking off another request
        pullNext(data.paging.next);
      });
    };

    pullNext();
  }

  queueDeltaCheck(deltaUrl) {
    this.timeouts.deltaCheck = setTimeout(() => {
      this.checkDelta.bind(this)(deltaUrl);
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
        delta: data.count
      });

      this.queueDeltaCheck(deltaUrl);
    });
  }

  render() {
    const { url, orgs, repos, pagingHref, timelineDelta, orgSelected, repoSelected } = this.props;

    let orgsListed;
    if (orgs.length === 1) {
      // if only 1 org available, force it to be defaulted (and no 'all option available')
      orgListed = [{
        label: orgs[0].login,
        value: orgs[0].login
      }];
    } else {
      // > 1 org available, give 'all orgs' option
      orgsListed = [{
        label: '* All Orgs',
        value: '*',
        className: classes.allOption
      }].concat(
        orgs.map(org => ({
          label: org.login,
          value: org.login
        }))
      );
    }

    let reposListed;
    if (orgSelected === '*') {
      // if viewing 'all' orgs, then disallow repo selection
      reposListed = [{
        label: '* All Repos',
        value: '*'
      }];
    } else {
      // filter down all repos to selected org's repos
      const reposAvail = repos.filter(repo => repo.org === orgSelected);

      if (reposAvail.length === 1) {
        // if only 1 repo available, force it to be defaulted (and no 'all option available')
        reposListed = [{
          label: reposAvail[0].name,
          value: reposAvail[0].name
        }];
      } else {
        // > 1 repo available, give 'all repos' option
        reposListed = [{
          label: '* All Repos',
          value: '*',
          className: classes.allOption
        }].concat(
          repos.map(repo => ({
            label: repo.name,
            value: repo.name
          }))
        );
      }
    }

    return (
      <div>
        {isNaN(timelineDelta) || timelineDelta <= 0 ? null : (
          <div
            className={classes.viewNew}
          >
            <Button
              size='small'
              color='gray'
              hallow={true}
              className={classes.button}
              onClick={() => {
                this.pullTimelineDelta();
              }}
            >
              View {timelineDelta} new activit{timelineDelta === 1 ? 'y' : 'ies'}
            </Button>
          </div>
        )}

        <span className={classes.repoSelection}>
          <Dropdown
            ref={ref => this.orgDropdown = ref}
            label='Organization'
            options={orgsListed}
            value={orgsListed[0].value}
            onSelect={() => {
              const orgNewlySelected = this.orgDropdown.value;
              window.location = `/?org=${orgNewlySelected}&repo=*`;
            }}
          />

          <Dropdown
            ref={ref => this.repoDropdown = ref}
            label='Repo'
            options={reposListed}
            value={reposListed[0].value}
            onSelect={() => {
              const repoNewlySelected = this.repoDropdown.value;
              window.location = `/?org=${orgSelected}&repo=${repoNewlySelected}`;
            }}
          />
        </span>

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

const selector = store => ({
  timeline: store.timeline,
  pagingHref: store.pagingHref,
  timelineDelta: store.timelineDelta
});

const ConnectedDashbord = connect(selector, actions)(Dashboard);

export default props => (
  <Layout url={props.url}>
    <ConnectedDashbord
      {...props}
      orgs={props.url.query.orgs}
      repos={props.url.query.repos}
      orgSelected={props.url.query.orgSelected}
      repoSelected={props.url.query.repoSelected}
    />
  </Layout>
);
