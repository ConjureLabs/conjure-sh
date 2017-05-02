import { Component } from 'react';
import { browserHistory } from 'react-router';

import styles from './styles.styl';

class FullListing extends Component {
  render() {
    return (
      <div className={styles.root}>
        <header calssName={styles.header}>
          <span>
            <img src={staticContent.account.photo} />
          </span>
        </header>
        {
          staticContent.repos.map(repo => {
            return (
              <a
                href=''
                className={styles.repo}
                onClick={e => {
                  e.preventDefault();
                  browserHistory.push(`/r/GitHub/${repo.fullName}`);
                }}
                key={repo.fullName}
              >
                {repo.fullName}
              </a>
            );
          })
        }
      </div>
    );
  }
}

export default FullListing;
