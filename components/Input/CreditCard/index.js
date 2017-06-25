import Input from '../index.js';

import {
  cards,
  cardPrefixDict,
  maxCardPrefixLength
} from './cards.js';

const nonDigitExpr = /\D/g;

export default class CreditCardInput extends Input {
  constructor(props) {
    super(props);

    this.type = 'text';
    this.cardType = undefined;

    this.forcedInputProps.maxLength = '21';
  }

  onKeyUp() {
    super.onChange(...arguments);
    let prunedValue = this.input.value.replace(nonDigitExpr, '');
    const cardType = this.determineCard();

    if (cardType === undefined) {
      if (this.input.value !== prunedValue) {
        this.input.value = prunedValue;
      }
      return;
    }

    const format = cards[ cardType ].format;
    const newValueChunks = [];
    console.log('pruned val', prunedValue);
    for (let i = 0; i < format.length; i++) {
      const chunkLen = format[i];

      newValueChunks.push(prunedValue.substr(0, chunkLen));
      prunedValue = prunedValue.substr(chunkLen);

      console.log('new pruned val', prunedValue);

      if (!prunedValue.length) {
        console.log('> break');
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
    const value = this.input.value.replace(/\D/g, '');

    // if the value is too long, we must have already found a match, so more checks would be wasteful
    if (value.length > maxCardPrefixLength) {
      return this.cardType;
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
