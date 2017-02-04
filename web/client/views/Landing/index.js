import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import styles from './styles.styl';
import Button from '~/Button';

class Landing extends Component {
  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <nav className={styles.navigation}>
            <h1>Sentry CI</h1>

            <ol className={styles.links}>
              <li className={styles.item}>
                <form action='/auth/github' method='post'>
                  <button type='submit'>Sign In</button>
                </form>
              </li>

              <li className={styles.item}>
                <Button>Sign Up</Button>
              </li>
            </ol>
          </nav>

          <p className={styles.firstImpression}>Test better. Deploy faster.</p>

          <div className={styles.cta}>
            <Button>Sign Up</Button>
            <sub>for free</sub>
          </div>
        </header>
      </div>
    );
  }
}

const routes = [{
  path: '/',
  indexRoute: {
    component: Landing
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
