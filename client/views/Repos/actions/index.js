const selectPlacementInBranchTree = (store, { level, value }) => {
  const newStore = Object.assign({}, store);

  console.log(store);

  switch (level) {
    case 'none':
      newStore.org = null;
      newStore.repo = null;
      newStore.branch = null;
      newStore.level = 'none';
      break;

    case 'org':
      newStore.org = value;
      newStore.repo = null;
      newStore.branch = null;
      newStore.level = 'org';
      break;

    case 'repo':
      newStore.repo = value;
      newStore.branch = null;
      newStore.level = 'repo';
      break;

    case 'branch':
      newStore.branch = value;
      newStore.level = 'branch';
      break;

    default:
      return store;
  }

  return newStore;
};

export default {
  selectPlacementInBranchTree
};
