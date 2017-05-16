export const clearBranchTree = () => {
  return {
    type: 'SET_TREE',
    org: null,
    repo: null,
    branch: null
  };
};

export const setOrg = org => {
  return {
    type: 'SET_TREE',
    org
  };
};

export const setRepo = repo => {
  return {
    type: 'SET_TREE',
    repo
  };
};

export const setBranch = branch => {
  return {
    type: 'SET_TREE',
    branch
  };
};
