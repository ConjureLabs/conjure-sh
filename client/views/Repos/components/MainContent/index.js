import { Component } from 'react';
import { connect } from 'm/ReStore';
import { post } from 'm/xhr';
import Button from 'c/Button';
import AnchorList from 'c/AnchorList';
import styles from './styles.styl';

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
      <div className={styles.onboarding}>
        <div className={styles.label}>
          {label}
        </div>

        <div className={styles.description}>
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
        className={styles.anchorList}
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
        className={styles.listenButton}
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

    // todo: deal with no repo found in .find()
    const repoData = resources.repos[org].find(repoData => {
      return repoData.name === repo;
    });

    post('/api/repo/watch', {
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
      <main className={styles.root}>
        <span className={styles.wrap}>
          {this.onboardingMessage}
          {this.branchNav}
          {this.watchPrompt}
        </span>
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
