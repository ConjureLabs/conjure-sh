import { createSelector } from 'reselect';

export default createSelector(
  state => {
    org: state.org,
    repo: state.repo,
    branch: state.branch
  }
);
