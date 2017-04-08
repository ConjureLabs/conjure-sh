import { Component } from 'react';
import { post } from 'm/xhr';

import styles from './styles.styl';

const onRepoClick = Symbol('on repo click');

class FullListing extends Component {
  [onRepoClick](repo) {
    console.log(repo);

    post('/api/repo/enable', {
      service: 'github',
      name: repo.name,
      url: repo.url,
      isPrivate: repo.private,
      githubId: repo.id,
      vm: 'web' // forced to web for now
    }, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  }

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
                  this[onRepoClick].call(this, repo)
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
