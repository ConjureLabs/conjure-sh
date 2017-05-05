import { Component } from 'react';
import { browserHistory } from 'react-router';

import styles from './styles.styl';

const selectOrg = Symbol('select org');
const selectRepo = Symbol('select repo');
const selectBranch = Symbol('select branch');

class FullListing extends Component {
  constructor(props) {
    super(props);

    this.state ={
      org: null,
      repo: null,
      branch: null
    };
  }

  [selectOrg](org) {
    this.setState({
      org,
      repo: null,
      branch: null
    });
  }

  [selectRepo](repo) {
    this.setState({
      repo,
      branch: null
    });
  }

  [selectBranch](branch) {
    this.setState({
      branch
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.serviceName}>Conjure</h1>

          <nav className={styles.userNav}>
            <span
              className={styles.avatar}
              style={{ backgroundImage: 'url(' + staticContent.account.photo + ')' }}
            />

            <ol className={styles.links}>
              <li className={styles.item}>
                <a
                  href='/settings'
                  className={styles.link}
                >
                  Settings
                </a>
              </li>

              <li className={styles.item}>
                <a
                  href='/logout'
                  className={styles.link}
                >
                  Logout
                </a>
              </li>
            </ol>
          </nav>
        </header>

        <main className={styles.content}>
          <ol className={styles.branchNav}>
            {
              this.branchNavContent()
            }
          </ol>
        </main>
      </div>
    );
  }

  branchNavContent() {
    const { org, repo, branch } = this.state;
    const levelAt = branch !== null ? 'branch' :
      repo !== null ? 'repo' :
      org !== null ? 'org' :
      'all';

    switch(levelAt) {
      case 'all':
        return Object.keys(staticContent.reposByOrg).map(org => (
          return (
            <a
              href={`./${org}`}
              className={styles.link}
              onClick={e => {
                e.preventDefault();
                this[selectOrg](org);
              }}
              key={org}
            >
              {org}
            </a>
          );
        ));

      case 'org':
        return staticContent.reposByOrg[org].map(repo => {
          return (
            <a
              href={`./${repo.name}`}
              className={styles.link}
              onClick={e => {
                e.preventDefault();
                this[selectRepo](repo);
              }}
              key={`${org}/${repo}`}
            >
              {repo.name}
            </a>
          );
        });

      case 'repo':
        return [<span>pending</span>];

      case 'branch':
        return [<span>pending</span>];
    }
  }
}

export default FullListing;
