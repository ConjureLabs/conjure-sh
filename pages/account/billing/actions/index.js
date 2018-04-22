const addCard = (store, { card }) => {
  const newCards = store.cards.slice()
  newCards.push(card)

  return {
    ...store,
    cards: newCards
  }
}

const removeCard = (store, { card }) => {
  let index = -1
  for (let i = 0; i < store.cards.length; i++) {
    if (store.cards[i].id === card.id) {
      index = i
      break
    }
  }

  if (index === -1) {
    return store
  }

  const newCards = store.cards.slice()
  newCards.splice(index, 1)

  return {
    ...store,
    cards: newCards
  }
}

export default {
  addCard,
  removeCard
}
