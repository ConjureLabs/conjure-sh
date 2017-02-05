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
            <h1 className={styles.sentry}>Sentry CI</h1>

            <ol className={styles.links}>
              <li className={styles.item}>
                <form action='/auth/github' method='post'>
                  <button type='submit'>Sign In</button>
                </form>
              </li>

              <li className={styles.item}>
                <Button
                  size='small'
                  color='black'
                >
                  Sign Up
                </Button>
              </li>
            </ol>
          </nav>

          <div className={styles.ctaContainer}>
            <p className={styles.firstImpression}>Test better. Deploy faster.</p>

            <div className={styles.cta}>
              <Button
                size='large'
                color='peach'
              >
                Sign Up
              </Button>
              <sub className={styles.info}>for free</sub>
            </div>
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
