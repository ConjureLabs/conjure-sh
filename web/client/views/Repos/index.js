import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import styles from './styles.styl';

const onRepoClick = Symbol('on repo click');

class Repos extends Component {
  [onRepoClick](repo) {
    console.log(repo);
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
  path: '/',
  indexRoute: {
    component: Repos
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
