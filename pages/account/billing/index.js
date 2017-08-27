import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import CreditCardSummary from '../../../components/CreditCardSummary';

export default class AccountBilling extends Component {
  render() {
    const { query } = this.props.url;
    const { account, cards } = query;

    const initialState = {
      account: account
    };

    return (
      <ReStore store={initialState}>
        <Header />

        <div className={classes.wrap}>
          {cards.map(card => {
            return (
              <CreditCardSummary
                {...card}
              />
            );
          })}

          {styles}
        </div>
      </ReStore>
    );
  }
}
