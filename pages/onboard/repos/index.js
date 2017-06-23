import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';

export default class OnboardRepos extends Component {
  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <ReStore store={initialState}>
        <Header />

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
      </ReStore>
    );
  }
}
