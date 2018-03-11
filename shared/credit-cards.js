// main card hash
// format is the number of ints per chunk, when showing a card to client
// cvv is the length of the cvv
// prefixes is a list of ranges of number prefixes associated to the card
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
      ['0604'], // avoid octal
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
}

// building dictionary of [card prefix] => [card type name]
const cardPrefixDict = {}
Object.keys(cards).forEach(cardKey => {
  for (let i = 0; i < cards[cardKey].prefixes.length; i++) {
    const current = cards[cardKey].prefixes[i]

    if (current.length === 1) {
      cardPrefixDict[ current[0].toString() ] = cardKey
      continue
    }

    for (let prefix = current[0]; prefix < current[1]; prefix++) {
      cardPrefixDict[ prefix.toString() ] = cardKey
    }
  }
})

// for perf, it's good to know the longest prefix string length
const maxCardPrefixLength = Object.keys(cardPrefixDict).sort((a, b) => {
  return b.length - a.length
})[0].length

export {
  cards,
  cardPrefixDict,
  maxCardPrefixLength
}
