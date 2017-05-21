import { createSelector } from 'reselect';

export default createSelector(
  state => {
    return {
      state.ready
    };
  }
);
