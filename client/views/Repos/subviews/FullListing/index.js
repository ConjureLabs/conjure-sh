import { Component } from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import { post } from 'm/xhr';
import Button from 'c/Button';

import styles from './styles.styl';

const selectNothing = Symbol('select nothing');
const selectOrg = Symbol('select org');
const selectRepo = Symbol('select repo');
const selectBranch = Symbol('select branch');
const enableWatch = Symbol('enable watch repo');

class FullListing extends Component {
  constructor(props) {
    super(props);

    this.state ={
      org: null,
      repo: null,
      branch: null
    };
  }

  [selectNothing]() {
    this.setState({
      org: null,
      repo: null,
      branch: null
    });
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
          <span className={styles.treeLocation}>
            {
              this.headerContents()
            }
          </span>

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
          {
            this.generateMainContent()
          }
        </main>
      </div>
    );
  }

  generateMainContent() {
    const branchNav = this.branchNavContent();

    if (Array.isArray(branchNav)) {
      return (
        <ol className={styles.branchNav}>
          {
            branchNav.content.map((item, i) => (
              <li
                className={styles.item}
                key={`${branchNav.level}-${i}`}
              >
                {item}
              </li>
            ))
          }
        </ol>
      );
    }

    if (this.state.branch !== null) {
      return (
        <span>PENDING - SHOULD NOT BE ABLE TO GET HERE</span>
      );
    }

    return (
      <Button
        size='small'
        color='black'
        onClick={() => {
          this[enableWatch]();
        }}
      >
        Watch Repo
      </Button>
    );
  }

  [enableWatch]() {
    const orgName = this.state.org;
    const repoName = this.state.repo.name;

    // todo: deal with no repo found in .find()
    const repo = staticContent.reposByOrg[orgName].find(repo => {
      return repo.name === repoName;
    });

    post('/api/repo/watch', {
      service: 'github',
      name: repo.name,
      fullName: repo.fullName,
      orgName,
      repoName,
      url: repo.url,
      isPrivate: repo.private,
      githubId: repo.id,
      vm: 'web' // forced to web for now
    }, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
      } else {
        console.log(data);
        alert('listening');
      }
    });
  }

  branchNavContent() {
    const { org, repo, branch } = this.state;
    const levelAt = branch !== null ? 'branch' :
      repo !== null ? 'repo' :
      org !== null ? 'org' :
      'all';

    switch(levelAt) {
      case 'all':
        return {
          level: 'all',
          content: Object.keys(staticContent.reposByOrg).map(org => (
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
          ))
        };

      case 'org':
        return {
          level: 'org',
          content: staticContent.reposByOrg[org].map(repo => (
            <a
              href={`./${repo.name}`}
              className={styles.link}
              onClick={e => {
                e.preventDefault();
                this[selectRepo](repo);
              }}
              key={`${org}/${repo.name}`}
            >
              {repo.name}
            </a>
          ))
        };

      case 'repo':
        return {
          level: 'repo',
          content: null
        };

      case 'branch':
        return {
          level: 'branch',
          content: null
        };
    }
  }

  headerContents() {
    const { org, repo, branch } = this.state;

    return [
      <h1
        className={classnames(styles.treeNav, styles.serviceName, org === null ? styles.current : null)}
        onClick={org === null ? null : () => {
          this[selectNothing]();
        }}
      >
        ⎔
      </h1>,

      org === null ? null : (
        <h2
          className={classnames(styles.treeNav, styles.orgName, repo === null ? styles.current : null)}
          onClick={repo === null ? null : () => {
            this[selectOrg](org);
          }}
        >
          {org}
        </h2>
      ),

      repo === null ? null : (
        <span className={styles.separator}>/</span>
      ),

      repo === null ? null : (
        <h3
          className={classnames(styles.treeNav, styles.repoName, branch === null ? styles.current : null)}
          onClick={branch === null ? null : () => {
            this[selectRepo](repo);
          }}
        >
          {repo.name}
        </h3>
      ),

      branch === null ? null : (
        <span className={styles.separator}>/</span>
      ),

      branch === null ? null : (
        <h4
          className={classnames(styles.treeNav, styles.branchName, styles.current)}
        >
          {branch}
        </h4>
      )
    ];
  }
}

export default FullListing;
