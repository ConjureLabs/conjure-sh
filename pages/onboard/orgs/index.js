import { Component } from 'react';
import styles, { classes } from '../styles.js';

import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

console.log(req.query);

export default class OnboardOrgs extends Component {
  render() {
    return (
      <div>
        <div className={classes.wrap}>
          <header>
            <sup>👋</sup>
            <span>Welcome to Conjure! Let's get started.</span>
          </header>

          <article>
            <sup>1</sup>
            <span>Select the GitHub organization or account You'd like to use with Conjure</span>
          </article>

          <main>
{/*            <AnchorList
              list={list}
              onSelect={onSelect}
              className={classes.anchorList}
            />*/}
          </main>

          {styles}
        </div>
      </div>
    );
  }
}
