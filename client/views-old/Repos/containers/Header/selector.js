import { createSelector } from 'reselect';

export default createSelector(
  state => {
    return {
      org: state.org,
      repo: state.repo,
      branch: state.branch
    };
  }
);
