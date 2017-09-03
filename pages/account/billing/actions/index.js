const addCard = (store, { card }) => {
  const newCards = store.cards.slice();
  newCards.push(card);

  return Object.assign({}, store, {
    cards: newCards
  });
};

const removeCard = (store, { card }) => {
  const index = store.cards.indexOf(card);

  if (index === -1) {
    return store;
  }

  const newCards = store.cards.slice();
  newCards.splice(index, 1);

  return Object.assign({}, store, {
    cards: newCards
  });
};

export default {
  addCard,
  removeCard
};
