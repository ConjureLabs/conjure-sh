import { Component } from 'react';
import styles, { classes } from './styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
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

        <div className={classes.buttonWrap}>
          <div className={classes.wrap}>
            <Button
              color='blue'
              hallow={false}
              size='small'
              onClick={() => {
                window.location='/account/billing/entry';
              }}
            >
              Add New Card
            </Button>
          </div>
        </div>

        <div className={classes.wrap}>
          {cards.map(card => {
            return (
              <div className={classes.card}>
                <span className={classes.actions}>
                  <a
                    href=''
                    onClick={() => {}}
                  >
                    Delete Card
                  </a>
                </span>

                <CreditCardSummary
                  {...card}
                />
              </div>
            );
          })}

          {styles}
        </div>
      </ReStore>
    );
  }
}
