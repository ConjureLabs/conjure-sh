import { Component } from 'react';
import actions from './actions';
import styles, { classes } from './styles.js';
import Federal, { connect } from 'federal';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import CardUI from './card-ui.js';

class Billing extends Component {
  render() {
    const { cards } = this.props;

    return (
      <div>
        <div className={classes.buttonWrap}>
          <div className={classes.wrap}>
            <Button
              color='blue'
              hallow={false}
              size='small'
              onClick={() => {
                window.location = '/account/billing/entry';
              }}
            >
              Add New Card
            </Button>
          </div>
        </div>

        <div className={classes.wrap}>
          {cards.map(card => {
            return (
              <CardUI
                key={`account-card-${card.id}`}
                card={card}
                className={classes.card}
              />
            );
          })}

          {styles}
        </div>
      </div>
    );
  }
}

const selector = store => ({
  account: store.account,
  cards: store.cards
});

const ConnectedBilling = connect(selector, actions)(Billing);

export default props => (
  <Layout
    url={props.url}
    title='Account Billing'
    withWrapper={false}
  >
    <ConnectedBilling {...props} />
  </Layout>
);
