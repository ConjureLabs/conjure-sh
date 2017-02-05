import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';
import styles from './styles.styl';
import Button from '~/Button';

const submitForm = Symbol('submit sign in/up form');

class Landing extends Component {
  constructor(props) {
    super(props);
    this.form = null; // placehoder for form el ref
  }

  [submitForm]() {
    this.form.submit();
  }

  render() {
    return (
      <form
        action='/auth/github'
        className={styles.trueForm}
        method='post'
        ref={form => this.form = form}
      />

      <div className={styles.root}>
        <header className={styles.header}>
          <nav className={styles.navigation}>
            <h1 className={styles.sentry}>Sentry CI</h1>

            <ol className={styles.links}>
              <li className={styles.item}>
                <a
                  onclick={this[submitForm]}
                  href=''
                >
                  Sign In
                </a>
              </li>

              <li className={styles.item}>
                <Button
                  size='small'
                  color='black'
                  onclick={this[submitForm]}
                >
                  Sign Up
                </Button>
              </li>
            </ol>
          </nav>

          <div className={styles.ctaContainer}>
            <p className={styles.firstImpression}>Test better. Deploy faster.</p>

            <div>
              <Button
                size='large'
                className={styles.cta}
                color='peach'
                onclick={this[submitForm]}
              >
                Sign Up
              </Button>
              <sub className={styles.info}>for free</sub>
            </div>
          </div>

          <div className={styles.browserTeaser} />
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
