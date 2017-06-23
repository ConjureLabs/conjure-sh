import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

export default class OnboardOrgs extends Component {
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
            <sup>👋</sup>
            <span>Welcome to Conjure! Let's get started.</span>
          </header>

          <article>
            <sup>1</sup>
            <span>Select the GitHub organization or account You'd like to use with Conjure</span>
          </article>

          <main>
            <AnchorList
              list={query.orgs.map(org => {
                return {
                  label: org.login,
                  value: org.id
                };
              })}
              onSelect={item => console.log(item)}
              className={classes.anchorList}
            />
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
