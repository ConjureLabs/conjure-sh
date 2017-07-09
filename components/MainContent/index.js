import { Component } from 'react';
import { connect } from '../../shared/ReStore';
import { post } from '../../shared/xhr';
import Button from '../Button';
import AnchorList from '../AnchorList';
import styles, { classes } from './styles.js';
import config from '../../shared/config.js';

const enableWatch = Symbol('enable watch repo');

class MainContent extends Component {
  get onboardingMessage() {
    const { level, onboard } = this.props;

    let label, desc;

    switch (level) {
      case 'all':
        label = 'Organization';
        desc = 'Select an Organization to get started';
        break;

      case 'org':
        label = 'Repo';
        desc = 'Select a Repo for Conjure to watch';
        break;

      case 'repo':
        label = 'Repo';
        desc = 'Click "watch repo" to have Conjure listen for changes';
        break;

      default:
        return null;
    }

    return (
      <div className={classes.onboarding}>
        <div className={classes.label}>
          {label}
        </div>

        <div className={classes.description}>
          {desc}
        </div>
      </div>
    );
  }

  get branchNav() {
    const { level, org, dispatch, resources } = this.props;

    let list, onSelect;

    switch (level) {
      case 'none':
        const orgs = Object.keys(resources.repos);

        list = orgs.map(org => {
          return {
            key: `branchNav/orgs/${org}`,
            label: org
          };
        });

        onSelect = org => {
          dispatch.selectPlacementInBranchTree({
            level: 'org',
            value: org.label
          });
        };
        break;

      case 'org':
        const repos = resources.repos[org];

        list = repos.map(repo => {
          return {
            key: `branchNav/repos/${repo.id}`,
            label: repo.name
          };
        });

        onSelect = repo => {
          dispatch.selectPlacementInBranchTree({
            level: 'repo',
            value: repo.label
          });
        };
        break;

      default:
        return null;
    }

    return (
      <AnchorList
        list={list}
        onSelect={onSelect}
        className={classes.anchorList}
      />
    );
  }

  get watchPrompt() {
    const { repo } = this.props;

    if (!repo) {
      return;
    }

    return (
      <Button
        size='large'
        color='black'
        hallow={true}
        className={classes.listenButton}
        onClick={() => {
          this[enableWatch]();
        }}
      >
        Watch Repo
      </Button>
    );
  }

  [enableWatch]() {
    const { org, repo, resources, dispatch } = this.props;

    const repoData = resources.repos[org].find(repoData => {
      return repoData.name === repo;
    });

    // this should not happen
    if (!repoData) {
      throw new Error('No repo record available to watch');
    }

    post(`${config.app.api.url}/api/repo/watch`, {
      service: 'github',
      name: repoData.name,
      fullName: repoData.fullName,
      orgName: org,
      repoName: repo,
      url: repoData.url,
      isPrivate: repoData.private,
      githubId: repoData.id,
      vm: 'web' // forced to web for now
    }, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        return;
      }

      console.log(data);
      alert('listening');

      dispatch.doneOnboarding();
    });
  }

  render() {
    return (
      <main className={classes.root}>
        <span className={classes.wrap}>
          {this.onboardingMessage}
          {this.branchNav}
          {this.watchPrompt}
        </span>

        {styles}
      </main>
    );
  }
};

const selector = store => {
  return {
    level: store.level,
    org: store.org,
    repo: store.repo,
    resources: {
      repos: store.resources.repos
    },
    onboard: store.onboard
  };
};

export default connect(selector)(MainContent);
