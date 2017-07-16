import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

let submitting = false;

export default class OnboardOverlap extends Component {
  makeSelection(item) {
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/onboard/orgs/selection`, item, (err, data) => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = '/onboard/billing';
    });
  }

  render() {
    const { query } = this.props.url;
    console.log(query);
    const { account, orgsAlreadyAvailable, orgs } = query;

    const initialState = {
      account: account
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
            <span>
              {
                orgsAlreadyAvailable.length === 1 ? `Looks like there's already an Org on Conjure that you have access to:` :
                  `Looks like there are already ${orgsAlreadyAvailable.length} Orgs on Conjure that you have access to:`
              }
            </span>
          </article>

          <main className={classes.textListWrap}>
            <ol className={classes.textList}>
              {orgsAlreadyAvailable.map(org => {
                return (
                  <li key={org}>
                    {org}
                  </li>
                );
              })}
            </ol>

            <Decision
              primaryText='Skip to Dashboard'
              secondaryText='Set up another Org'
              onPrimaryClick={() => { console.log('PRIMARY CLICKED'); }}
              onSecondaryClick={() => {
                window.location = '/onboard/orgs';
              }}
            />
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
