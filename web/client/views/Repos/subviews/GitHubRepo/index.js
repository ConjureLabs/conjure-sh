import { Component } from 'react';

import styles from './styles.styl';

const onRequestListen = Symbol('on request to listen to github repo');

class GitHubRepo extends Component {
  [onRequestListen](repo) {
    console.log(repo);

    const { orgName, repoName } = this.props.params;

    post('/api/repo/listen', {
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
      } else {
        console.log(data);
      }
    });
  }

  render() {
    const { orgName, repoName } = this.props.params;

    return (
      <div className={styles.root}>
        {`${orgName} / ${repoName}`}
      </div>
    );
  }
}

export default GitHubRepo;
