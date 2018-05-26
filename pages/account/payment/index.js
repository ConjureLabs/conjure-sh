import { Component } from 'react'
import actions from './actions'
import styles, { classes } from './styles.js'
import Federal, { connect } from '@conjurelabs/federal'

import Button from 'components/Button'
import Page from 'components/Page'
import CardUI from './card-ui'

class Payment extends Component {
  render() {
    const cards = this.props.cards || []

    return (
      <div>
        <div className={classes.buttonWrap}>
          <div className={classes.wrap}>
            <Button
              color='blue'
              hallow={false}
              size='small'
              onClick={() => {
                window.location = '/account/payment/entry'
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
            )
          })}

          {styles}
        </div>
      </div>
    )
  }
}

const selector = store => ({
  account: store.account,
  cards: store.cards
})

const ConnectedPayment = connect(selector, actions)(Payment)

export default class PaymentPage extends Page {
  render() {
    return (
      <this.Layout
        title='Account Payment'
        withWrapper={false}
      >
        <ConnectedPayment {...this.props} />
      </this.Layout>
    )
  }
}
