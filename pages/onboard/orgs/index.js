import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

let submitting = false;

export default class OnboardOrgs extends Component {
  makeSelection(item) {
    // {label: "ConjureLabs", value: 1783213}
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/onboard/orgs/selection`, item, err => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = '/onboard/plan';
    });
  }

  render() {
    const { query } = this.props.url;

    return (
      <Layout url={url} limitedHeader={true}>
        <div className={classes.content}>
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
                  value: org.id,
                  key: org.id
                };
              })}
              onSelect={this.makeSelection}
              className={classes.anchorList}
            />
          </main>
        </div>

        {styles}
      </Layout>
    );
  }
}
