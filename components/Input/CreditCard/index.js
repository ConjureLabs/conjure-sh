import Input from '../index.js'

import {
  cards,
  cardPrefixDict,
  maxCardPrefixLength
} from '../../../shared/credit-cards.js'

const nonDigitExpr = /\D/g

export default class CreditCardInput extends Input {
  constructor(props) {
    super(props)

    this.type = 'text'
    this.cardType = undefined

    this.forcedInputProps.maxLength = 19
    this.forcedInputProps.autocomplete = 'off'
  }

  get value() {
    return this.input.value.replace(nonDigitExpr, '')
  }

  onKeyUp(event) {
    super.onChange(...arguments)

    const isDelete = event.key === 'Backspace'
    let prunedValue = this.input.value.replace(nonDigitExpr, '')
    const cardType = this.determineCard()

    if (cardType === undefined) {
      if (this.input.value !== prunedValue) {
        this.input.value = prunedValue
      }
      return
    }

    const format = cards[ cardType ].format
    const newValueChunks = []
    for (let i = 0; i < format.length; i++) {
      const chunkLen = format[i]

      newValueChunks.push(prunedValue.substr(0, chunkLen))
      prunedValue = prunedValue.substr(chunkLen)

      if (!prunedValue.length) {
        break
      }
    }

    if (
      // do not want to do this if user is deleting
      !isDelete &&
      // if the card number is not complete
      newValueChunks.length !== format.length &&
      // but the last chunk was completed
      newValueChunks[ newValueChunks.length - 1 ].length === format[ newValueChunks.length - 1 ]
    ) {
      // then force another space at the end of the string
      newValueChunks.push('')
    }

    const newValue = newValueChunks.join(' ')
    if (this.input.value !== newValue) {
      this.input.value = newValue
    }
  }

  determineCard() {
    const value = this.input.value.replace(nonDigitExpr, '')

    // if the value is too long, we must have already found a match, so more checks would be wasteful
    if (value.length > maxCardPrefixLength) {
      return this.cardType
    }

    let newCardType = undefined
    for (let i = 0; i < value.length; i++) {
      const currentSubstring = value.substr(0, i + 1)
      if (cardPrefixDict[currentSubstring]) {
        newCardType = cardPrefixDict[currentSubstring]
        // not breaking loop, so that the longest match is returned
      }
    }

    // changing max length based on card type
    if (newCardType !== undefined) {
      const format = cards[ newCardType ].format
      this.forcedInputProps.maxLength = format.reduce((sum, current) => {
        return sum + current
      }, format.length - 1 /* spaces added to card */)
    } else {
      this.forcedInputProps.maxLength = 19
    }

    this.setState({
      label: newCardType
    })

    this.cardType = newCardType
    return this.cardType
  }
}
