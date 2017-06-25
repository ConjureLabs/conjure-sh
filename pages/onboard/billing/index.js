import { Component } from 'react';
import styles, { classes } from '../styles.js';
import { ReStore } from '../../../shared/ReStore';

import Header from '../../../components/Header';
import TextInput from '../../../components/Input/Text';
import Dropdown from '../../../components/Input/Dropdown';

const cards = {
  'American Express': {
    format: [4, 6, 5],
    cvv: 4,
    prefixes: [
      [34],
      [37]
    ]
  },

  UnionPay: {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [62],
      [88]
    ]
  },

  'Diners Club': {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [54, 55],
      [300, 305],
      [309],
      [36],
      [38, 39]
    ]
  },

  'Discover Card': {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [6011],
      [622126, 622925],
      [644, 649],
      [65]
    ]
  },

  JCB: {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [3528, 3589]
    ]
  },

  MasterCard: {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [50, 55],
      [5018],
      [5020],
      [5038],
      [5612],
      [5893],
      [6304],
      [6759],
      [6761],
      [6762],
      [6763],
      ['0604'],
      [6390]
    ]
  },

  Visa: {
    format: [4, 4, 4, 4],
    cvv: [3],
    prefixes: [
      [4],
      [5019]
    ]
  }
};

const cardPrefixDict = {};
Object.keys(cards).forEach(cardKey => {
  for (let i = 0; i < cards[cardKey].prefixes.length; i++) {
    const current = cards[cardKey].prefixes[i];

    if (current.length === 1) {
      cardPrefixDict[ current[0].toString() ] = cardKey;
      continue;
    }

    for (let prefix = current[0]; prefix < current[1]; prefix++) {
      cardPrefixDict[ prefix.toString() ] = cardKey;
    }
  }
});

const maxCardPrefixLength = Object.keys(cardPrefixDict).sort((a, b) => {
  return b.length - a.length;
})[0].length;

class CreditCardInput extends TextInput {
  constructor(props) {
    super(props);

    this.cardType = undefined;
  }

  onKeyUp() {
    super.onChange(...arguments);
    let prunedValue = this.input.value.replace(/[^\d]/g, '');
    const cardType = this.determineCard();

    if (cardType === undefined) {
      if (this.input.value !== prunedValue) {
        this.input.value = prunedValue;
      }
      return;
    }

    const format = cards[ cardType ].format;
    const newValueChunks = [];
    for (let i = 0; i < format.length; i++) {
      const chunkLen = format[i];

      newValueChunks.push(prunedValue.substr(0, chunkLen));
      prunedValue = prunedValue.substr(chunkLen);

      if (!prunedValue) {
        break;
      }
    }

    if (
      // if the card number is not complete
      newValueChunks.length !== format.length &&
      // but the last chunk was completed
      newValueChunks[ newValueChunks.length - 1 ].length === format[ newValueChunks.length - 1 ]
    ) {
      // then force another space at the end of the string
      newValueChunks.push('');
    }

    const newValue = newValueChunks.join(' ');
    if (this.input.value !== newValue) {
      this.input.value = newValue;
    }
  }

  determineCard() {
    const value = this.input.value.replace(/[^\d]/g, '');

    // if the value is too long, we must have already found a match, so more checks would be wasteful
    if (value.length > maxCardPrefixLength) {
      return;
    }

    for (let i = 0; i < value.length; i++) {
      const currentSubstring = value.substr(0, i + 1);
      if (cardPrefixDict[currentSubstring]) {
        this.cardType = cardPrefixDict[currentSubstring];
        // not breaking loop, so that the longest match is returned
      }
    }

    return this.cardType;
  }
}

export default class OnboardBilling extends Component {
  render() {
    const { query } = this.props.url;

    const initialState = {
      account: query.account
    };

    return (
      <ReStore store={initialState}>
        <Header />

        <div className={classes.wrap}>
          <header>
            <sup>💳</sup>
            <span>The first N of bandwidth will be free.</span>
          </header>

          <article>
            <sup>2</sup>
            <span>Billing</span>
          </article>

          <main>
            <div className={classes.sectionsParent}>
              <section>
                <span className={classes.sectionLabel}>Card</span>

                <ol>
                  <li>
                    <CreditCardInput
                      label='Number'
                      maxLength='19'
                    />
                  </li>
                </ol>
              </section>

              <section>
                <span className={classes.sectionLabel}>Billing Address</span>

                <ol>
                  <li>
                    <Dropdown
                      label='Country'
                      options={[
                        {label: 'United States', value: 'usa'},
                        {label: 'Thailand', value: 'th'}
                      ]}
                    />
                  </li>
                </ol>
              </section>
            </div>
          </main>

          {styles}
        </div>
      </ReStore>
    );
  }
}
