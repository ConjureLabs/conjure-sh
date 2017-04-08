import { Component } from 'react';
import { post } from 'm/xhr';

import styles from './styles.styl';

const onEnableWatch = Symbol('on request to watch a github repo');

class GitHubRepo extends Component {
  [onEnableWatch]() {
    const { orgName, repoName } = this.props.params;

    // todo: deal with no repo found in .find()
    const repo = staticContent.repos.find(repo => {
      return repo.fullName = `${orgName}/${repoName}`;
    });

    console.log(repo);

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
      } else {
        console.log(data);
      }
    });
  }

  render() {
    const { orgName, repoName } = this.props.params;

    return (
      <div className={styles.root}>
        <h3 className={styles.repoName}>{`${orgName} / ${repoName}`}</h3>
        <a
          href=''
          className={styles.anchor}
          onClick={e => {
            e.preventDefault();
            this[onEnableWatch]();
          }}
        >Watch repo</a>
      </div>
    );
  }
}

export default GitHubRepo;
