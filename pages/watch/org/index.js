import { Component } from 'react';
import styles, { classes } from './styles.js';
import { post } from '../../../shared/xhr';
import config from '../../../shared/config.js';

import Layout from '../../../components/Layout';
import Header from '../../../components/Header';
import AnchorList from '../../../components/AnchorList';

let submitting = false;

export default class WatchOrg extends Component {
  makeSelection(item) {
    // {label: "ConjureLabs", value: 1783213}
    if (submitting) {
      return;
    }

    submitting = true;

    post(`${config.app.api.url}/api/org/${item.value}/watch`, {}, err => {
      if (err) {
        console.error(err);
        alert(err.message);
        submitting = false;
        return;
      }

      window.location = `/watch/repos?org=${item.value}`;
    });
  }

  render() {
    const { url } = this.props;
    const { query } = url;
    const { orgs, watchedOrgs } = query;

    const listedOrgs = orgs.filter(org => !watchedOrgs.includes(org.login));

    return (
      <Layout url={url} limitedHeader={true}>
        <div className={classes.content}>
          <header>
            <sup>🚀</sup>
            <span>Select the GitHub organization or account you'd like to use with Conjure</span>
          </header>

          <main>
            <AnchorList
              list={listedOrgs.map(org => {
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
