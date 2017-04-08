import { Component } from 'react';
import { post } from 'm/xhr';
import { browserHistory } from 'react-router';

import styles from './styles.styl';

class FullListing extends Component {
  render() {
    return (
      <div className={styles.root}>
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
