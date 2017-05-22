// import { Component as 'ReactComponent' } from 'react';
// import { Provider, connect as 'reactReduxConnect' } from 'react-redux';
// import { createStore as 'reduxCreateStore', applyMiddleware } from 'redux';

// let cachedStore;
// export function createStore() {
//   if (cachedStore) {
//     throw new Error('MiniDux does not allow you to create store twice');
//   }

//   cachedStore = reduxCreateStore.apply(reduxCreateStore, arguments);
//   return cachedStore;
// }

// export Provider;
// export applyMiddleware;

// export function connect() {
//   reactReduxConnect
// }


import { Component } from 'react';

class Store extends Component {
  constructor(props, context) {
    super(props, context);

    const { store, actions } = Object.assign({
      store: {},
      actions: {}
    }, props);

    this.store = store;
    this.actions = actions;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store !== this.store) {
      throw new Error('Can not alter Store data on the fly');
    }
  }

  getChildContext() {
    return {
      store: this.store
    };
  }
}
