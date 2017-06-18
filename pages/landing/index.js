import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles, { classes } from './styles.js';
import Button from '../../components/Button';
import config from '../../shared/config.js';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.form = null; // placehoder for form el ref
  }

  submitForm(e) {
    e.preventDefault();
    this.form.submit();
  }

  render() {
    return (
      <div className={classes.root}>
        <form
          action={`${config.app.api.url}/auth/github`}
          className={classes.trueForm}
          method='post'
          ref={form => this.form = form}
        />

        <header className={classes.header}>
          <nav className={classes.navigation}>
            <h1 className={classes.serviceName}>Conjure</h1>

            <ol className={classes.linkslist}>
              <li className={classes.item}>
                <a
                  className={classes.link}
                  onClick={this.submitForm.bind(this)}
                  href=''
                >
                  Sign In
                </a>
              </li>

              <li className={classes.item}>
                <Button
                  size='small'
                  color='black'
                  onClick={this.submitForm.bind(this)}
                >
                  Sign Up
                </Button>
              </li>
            </ol>
          </nav>

          <div className={classes.ctaContainer}>
            <p className={classes.mark}>⎔</p>
            <p className={classes.firstImpression}>
              <sup className={classes.name}>Conjure</sup>
              <span>brings your branches to life</span>
            </p>

            <div>
              <Button
                size='large'
                className={classes.cta}
                color='purple'
                onClick={this.submitForm.bind(this)}
              >
                <span className={classes.label}>Sign Up</span>
              </Button>
              <sub className={classes.info}>With GitHub</sub>
            </div>
          </div>

          <div className={classes.browserTeaser} />
        </header>

        {styles}
      </div>
    );
  }
}
