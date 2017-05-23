import { Component } from 'react';
import { connect } from 'm/ReStore';
import AnchorList from 'c/AnchorList';
import styles from './styles.styl';

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
      />
    );
  }

  render() {
    return (
      <main className={styles.root}>
        <span className={styles.wrap}>
          {this.onboardingMessage}
          {this.branchNav}
        </span>
      </main>
    );
  }
};

const selector = store => {
  return {
    level: store.level,
    org: store.org,
    resources: {
      repos: store.resources.repos
    },
    onboard: store.onboard
  };
};

export default connect(selector)(MainContent);
