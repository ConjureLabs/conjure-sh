import { Component } from 'react';
import styles, { classes } from '../styles.js';

import Header from '../../../components/Header';

export default class OnboardRepos extends Component {
  render() {
    return (
      <div>
        <div className={classes.wrap}>
          <header>
            <sup>🎟</sup>
            <span>Almost there!</span>
          </header>

          <article>
            <sup>3</sup>
            <span>What repos should Conjure bring to life?</span>
          </article>

          <main>
            asdf
          </main>

          {styles}
        </div>
      </div>
    );
  }
}
