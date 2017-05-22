import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './app';

const initialState = {
  resources: {
    repos: staticContent.reposByOrg
  }
};

const store = createStore(reducers, initialState);

const routes = [{
  path: '/',
  indexRoute: {
    component: App
  }
}];

ReactDOM.render(
  <Router history={browserHistory} routes={routes}>
    <Provider store={store} />
  </Router>,
  document.getElementById('container')
);

