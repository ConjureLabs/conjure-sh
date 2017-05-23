import { Component } from 'react';
import ReactDOM from 'react-dom';
import actions from './actions';
import { ReStore } from 'm/ReStore';

import Header from './components/Header';
import MainContent from './components/MainContent';

const initialStore = {
  org: null,
  repo: null,
  branch: null,
  level: 'none',

  resources: {
    repos: staticContent.reposByOrg
  }
};

ReactDOM.render(
  <ReStore store={initialStore} action={actions}>
    <Header />
    <MainContent />
  </ReStore>,
  document.getElementById('container')
);
