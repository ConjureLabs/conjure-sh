import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import FullListing from './subviews/FullListing';
import GitHubRepo from './subviews/GitHubRepo';

const routes = [{
  path: '/r',
  indexRoute: {
    component: FullListing
  },
  childRoutes: [{
    path: '/r/GitHub/:orgName/:repoName',
    component: GitHubRepo
  }]
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
