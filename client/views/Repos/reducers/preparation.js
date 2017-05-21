export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_READY':
      return Object.assign({}, state, {
        ready: true
      });
  }
};
