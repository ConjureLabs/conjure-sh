import { Component } from 'react';
import classnames from 'classnames';

import styles, { classes } from './styles.js';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPlaceholder: true,
      isFocused: false
    };

    // this.type should be set for any child component
  }

  onChange() {
    const { onChange } = this.props;
    const { value } = this.input;
    const { initialPlaceholder, isFocused } = this.state;

    if (typeof onChange === 'function') {
      onChange(...arguments);
    }

    if (value === '' && initialPlaceholder === false && isFocused === false) {
      this.setState({
        initialPlaceholder: true
      });
    } else if (value !== '' && initialPlaceholder === true) {
      this.setState({
        initialPlaceholder: false
      });
    }
  }

  onFocus() {
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      onFocus(...arguments);
    }

    if (this.state.isFocused === false) {
      this.setState({
        isFocused: true
      });
    }
  }

  onBlur() {
    const { onBlur } = this.props;
    const { value } = this.input;
    const { isFocused, initialPlaceholder } = this.state;

    if (typeof onBlur === 'function') {
      onBlur(...arguments);
    }

    const stateChanges = {};

    if (isFocused === true) {
      stateChanges.isFocused = false;
    }
    if (value === '' && initialPlaceholder === false) {
      stateChanges.initialPlaceholder = true;
    }

    this.setState(stateChanges);
  }

  render() {
    const { label, ...props } = this.props;
    const { isFocused, initialPlaceholder } = this.state;

    // these events are handled within this class
    delete props.onChange;
    delete props.onFocus;
    delete props.onBlur;

    props.type = this.type ? this.type : props.type;

    return (
      <span className={classnames({
        [classes.initialPlaceholder]: !isFocused && initialPlaceholder
      })}>
        {label ? (<label>{label}</label>) : null}

        <input
          {...props}
          onChange={this.onChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          ref={input => this.input = input}
        />

        {styles}
      </span>
    );
  }
}
