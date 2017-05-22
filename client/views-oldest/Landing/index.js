import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import LoggedOut from './LoggedOut';

const routes = [{
  path: './',
  indexRoute: {
    component: LoggedOut
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>,
  document.getElementById('container')
);
