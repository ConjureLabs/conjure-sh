import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.js';
import globalStyles from './styles.global.js';
import Button from '../../components/Button';

const submitForm = Symbol('submit sign in/up form');

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.form = null; // placehoder for form el ref
  }

  [submitForm](e) {
    e.preventDefault();
    this.form.submit();
  }

  render() {
    return (
      <div className='root'>
        <form
          action={`${config.app.api.url}/auth/github`}
          className='trueForm'
          method='post'
          ref={form => this.form = form}
        />

        <header className='header'>
          <nav className='navigation'>
            <h1 className='serviceName'>Conjure</h1>

            <ol className='linkslist'>
              <li className='item'>
                <a
                  className='link'
                  onClick={this[submitForm].bind(this)}
                  href=''
                >
                  Sign In
                </a>
              </li>

              <li className='item'>
                <Button
                  size='small'
                  color='black'
                  onClick={this[submitForm].bind(this)}
                >
                  Sign Up
                </Button>
              </li>
            </ol>
          </nav>

          <div className='ctaContainer'>
            <p className='mark'>⎔</p>
            <p className='firstImpression'>
              <sup className='name'>Conjure</sup>
              <span>brings your branches to life</span>
            </p>

            <div>
              <Button
                size='large'
                className='cta'
                color='purple'
                onClick={this[submitForm].bind(this)}
              >
                <span className='label'>Sign Up</span>
              </Button>
              <sub className='info'>With GitHub</sub>
            </div>
          </div>

          <div className='browserTeaser' />
        </header>

        {styles}
        {globalStyles}
      </div>
    );
  }
}
