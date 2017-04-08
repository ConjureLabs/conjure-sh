import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import { post } from 'm/xhr';
import styles from './styles.styl';

const onRepoClick = Symbol('on repo click');

class Repos extends Component {
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

const routes = [{
  path: '/r',
  indexRoute: {
    component: Repos
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
