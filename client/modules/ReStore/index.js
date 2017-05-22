import { Component, Children } from 'react';

const problemMarker = Symbol('marker used for invalid or unknown value, likely due to error');

class Store extends Component {
  constructor(props, context) {
    super(props, context);

    const { store, actions } = Object.assign({
      store: {},
      actions: {}
    }, props);

    this.store = store;
    this.dispatch = Object.keys(actions).map(actionName => {
      this.store = actions[actionName](store, data);
    });
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

  render() {
    return Children.only(this.props.children);
  }
}

export Store;

function connect(selector = store => store) {
  return function wrapper(InboundComponent) {
    return function getContext({ ...props }, context) {
      const storeSelected = typeof selector === 'function' ? selector(context.store) :
        Array.isArray(selector) ? selector.reduce((selection, currentSelector) {
          return currentSelector(selection);
        }, context.store) :
        problemMarker;

      if (storeSelected === problemMarker) {
        throw new Error(`An invalid selector was passed to connect() for ${InboundComponent.displayName}`);
      }

      // props passed manually will override those in the store
      const usedProps = Object.assign({
        dispatch: context.dispatch
      }, storeSelected, props);

      return (
        <InboundComponent {...usedProps} />
      );
    };
  };
}

export connect;
