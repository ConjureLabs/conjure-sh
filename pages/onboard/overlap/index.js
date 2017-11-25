import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Layout from '../../../components/Layout';
import AnchorList from '../../../components/AnchorList';
import Decision from '../../../components/Decision';

// eslint thinks this var is not used, even though it is
let submitting = false; // eslint-disable-line no-unused-vars

export default class OnboardOverlap extends Component {
  handleSkip() {
    submitting = true;

    post(`${config.app.api.url}/api/onboard/skip`, {}, err => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = '/';
    });
  }

  render() {
    const { query } = this.props.url;
    const { account, orgsAlreadyAvailable } = query;

    const initialState = {
      account: account
    };

    return (
      <Layout url={url} limitedHeader={true}>
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
            className={classes.decision}
            size='medium'
            color='blue'
            primaryText='Skip to Dashboard'
            secondaryText='Set up a different Org'
            onPrimaryClick={this.handleSkip.bind(this)}
            onSecondaryClick={() => {
              window.location = '/onboard/orgs';
            }}
          />
        </main>

        {styles}
      </Layout>
    );
  }
}
