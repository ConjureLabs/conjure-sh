import { Component } from 'react';
import ReactDOM from 'react-dom';
import actions from './actions';
import { ReStore } from 'm/ReStore';

import Header from './components/Header';
import Services from './components/Services';

const initialStore = {
  integrations: staticContent.integrations
};

ReactDOM.render(
  <ReStore store={initialStore} actions={actions}>
    <Header />
    <Services />
  </ReStore>,
  document.getElementById('container')
);
