const branchTree = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TREE':
      const newState = Object.assign({
        org: null,
        repo: null,
        branch: null,
      }, state, action);

      newState.level = newState.branch !== null ? 'branch' :
        newState.repo !== null ? 'repo' :
        newState.org !== null ? 'org' :
        'none';

      return newState;
  }
};

export default branchTree;
