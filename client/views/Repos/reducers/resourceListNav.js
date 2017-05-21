export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_RESOURCES_ORGS':
      const newState = Object.assign({}, state);

      if (!newState.resources) {
        newState.resource = {};
      } else {
        newState.resources = Object.assign({}, resources, {
          orgs: action.orgs
        });
      }

      return newState;

    case 'SET_RESOURCES_REPOS':
      const newState = Object.assign({}, state);

      if (!newState.resources) {
        newState.resource = {};
      } else {
        newState.resources = Object.assign({}, resources, {
          repos: action.repos
        });
      }

      return newState;
  }
};
