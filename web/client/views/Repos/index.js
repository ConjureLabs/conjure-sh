import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import FullListing from './subviews/FullListing';
import SingleRepo from './subviews/SingleRepo';

const routes = [{
  path: '/r',
  indexRoute: {
    component: FullListing
  },
  childRoutes: [{
    path: '/r/github/:orgName/:repoName',
    component: SingleRepo
  }]
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
