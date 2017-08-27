import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';

export default class AccountBilling extends Component {
  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <ReStore store={initialState}>
        <Header />

        <div className={classes.wrap}>
          {styles}
        </div>
      </ReStore>
    );
  }
}
