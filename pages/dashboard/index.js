import { Component } from 'react';
import actions from './actions';
import styles, { classes } from './styles.js';
import { ReStore } from '../../shared/ReStore';

import Header from '../../components/Header';

export default class Dashboard extends Component {
  render() {
    // todo: avoid using props.url.query
    const { query } = this.props.url;
    const { account, orgs } = query;

    const initialState = {
      account
    };

    return (
      <ReStore store={initialState} actions={actions}>
        <Header>
          <span className={classes.headerContent}>
            <select>
              {orgs.map(org => {
                return (
                  <option value={org.id}>{org.login}</option>
                );
              })}
            </select>
          </span>
        </Header>

        {styles}
      </ReStore>
    );
  }
}
