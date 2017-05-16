import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ConjureApp from './reducers';

import LoggedOut from './LoggedOut';

const store = createStore(ConjureApp);

const routes = [{
  path: '/',
  indexRoute: {
    component: LoggedOut
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}>
    <Provider store={store}/>
  </Router>,
  document.getElementById('container')
);
