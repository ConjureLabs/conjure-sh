export const selectPlacementInBranchTree = (store, { level, value }) => {
  let storeOverride;

  switch (level) {
    case 'none':
      storeOverride = {
        org: null,
        repo: null,
        branch: null,
        level: 'none'
      };
      break;

    case 'org':
      storeOverride = {
        org: value,
        repo: null,
        branch: null,
        level: 'org'
      };
      break;

    case 'repo':
      storeOverride = {
        repo: value,
        branch: null,
        level: 'repo'
      };
      break;

    case 'branch':
      storeOverride = {
        branch: value,
        level: 'branch'
      };
      break;

    default:
      storeOverride = {};
      break;
  }

  return Object.assign({}, store, storeOverride);
};
