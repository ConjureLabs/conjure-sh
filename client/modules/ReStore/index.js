import { Component, Children, isValidElement, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';

const problemMarker = Symbol('marker used for invalid or unknown value, likely due to error');

class ReStore extends Component {
  constructor(props) {
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
      throw new Error('Can not alter ReStore.store data on the fly');
    }
  }

  getChildContext() {
    return {
      store: this.store
    };
  }

  render() {
    const { children } = this.props;

    return !children ? null :
      React.isValidElement(children) ? Children.only(children) :
      Array.isArray(children) ? (
        <span>{children}</span>
      ) :
      null;
  }

  static childContextTypes = {
    store: PropTypes.object.isRequired
  }
}

export { ReStore };

function connect(selector) {
  return function wrapper(InboundComponent) {
    class x extends Component {
      render() {
        const store = this.context.store;
        console.log(cstore, selector);

        const storeSelected = typeof selector === 'function' ? selector(context.store) :
          Array.isArray(selector) ? selector.reduce((selection, currentSelector) => {
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
      }

      static contextTypes = {
        store: PropTypes.object.isRequired
      }
    }

    return x;


    // const cloned = cloneElement(InboundComponent);
    // cloned.contextTypes = PropTypes.object.isRequired;

    // return function getContext({ ...props }, context) {
    //   console.log(context.store, selector);
    //   const storeSelected = typeof selector === 'function' ? selector(context.store) :
    //     Array.isArray(selector) ? selector.reduce((selection, currentSelector) => {
    //       return currentSelector(selection);
    //     }, context.store) :
    //     problemMarker;

    //   if (storeSelected === problemMarker) {
    //     throw new Error(`An invalid selector was passed to connect() for ${InboundComponent.displayName}`);
    //   }

    //   // props passed manually will override those in the store
    //   const usedProps = Object.assign({
    //     dispatch: context.dispatch
    //   }, storeSelected, props);

    //   return (
    //     <InboundComponent {...usedProps} />
    //   );
    //};
  };
}

export { connect };
