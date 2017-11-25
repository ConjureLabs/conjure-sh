import { Component } from 'react';
import actions from './actions';
import styles, { classes } from './styles.js';
import Federal, { connect } from 'federal';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import CardUI from './card-ui.js';

class Billing extends Component {
  render() {
    const { url, cards } = this.props;

    return (
      <Layout
        url={url}
        title='Account Billing'
        withWrapper={false}
      >
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
      </Layout>
    );
  }
}

const selector = store => {
  return {
    account: store.account,
    cards: store.cards
  };
};

export default connect(selector)(Billing);

// export default ({ url }) => {
//   const { account, cards } = url.query;

//   const initialState = {
//     account,
//     cards
//   };

//   return (
//     <Federal store={initialState} actions={actions}>
//       <ConnectedBilling />
//     </Federal>
//   );
// };
