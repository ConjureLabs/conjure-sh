import { Component } from 'react';
import { browserHistory } from 'react-router';

import styles from './styles.styl';

class FullListing extends Component {
  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <span
            className={styles.avatar}
            style={{ backgroundImage: 'url(' + staticContent.account.photo + ')' }}
          />
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
