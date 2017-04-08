import { Component } from 'react';

import styles from './styles.styl';

class GitHubRepo extends Component {
  // [onRepoClick](repo) {
  //   console.log(repo);

  //   post('/api/repo/enable', {
  //     service: 'github',
  //     name: repo.name,
  //     fullName: repo.fullName,
  //     url: repo.url,
  //     isPrivate: repo.private,
  //     githubId: repo.id,
  //     vm: 'web' // forced to web for now
  //   }, (err, data) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log(data);
  //     }
  //   });
  // }
  //

  render() {
    return (
      <div className={styles.root}>
        asaa
      </div>
    );
  }
}

export default GitHubRepo;
