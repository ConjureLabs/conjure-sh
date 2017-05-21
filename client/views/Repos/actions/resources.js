export const setOrgs = orgs => {
  return {
    type: 'SET_RESOURCES_ORGS',
    orgs
  };
};

export const setRepos = repos => {
  return {
    type: 'SET_RESOURCES_REPOS',
    repos
  };
};
