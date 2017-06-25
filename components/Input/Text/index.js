import { Component } from 'react';
import classnames from 'classnames';

import styles, { classes } from './styles.js';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: true
    };
  }

  onChange() {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(...arguments);
    }

    if (this.input.value === '' && this.state.placeholder === false) {
      this.setState({
        placeholder: true
      });
    } else if (this.input.value !== '' && this.state.placeholder === true) {
      this.setState({
        placeholder: false
      });
    }
  }

  onFocus() {
    const { onFocus } = this.props;

    if (typeof onFocus === 'function') {
      onFocus(...arguments);
    }

    if (this.state.placeholder === true) {
      this.setState({
        placeholder: false
      });
    }
  }

  onBlur() {
    const { onBlur } = this.props;

    if (typeof onBlur === 'function') {
      onBlur(...arguments);
    }

    if (this.state.placeholder === false && this.input.value === '') {
      this.setState({
        placeholder: true
      });
    }
  }

  render() {
    const { label, ...props } = this.props;

    // these events are handled within this class
    delete props.onChange;
    delete props.onFocus;
    delete props.onBlur;

    return (
      <span className={classnames({
        [classes.placeholder]: this.state.placeholder
      })}>
        {label ? (<label>{label}</label>) : null}

        <input
          {...props}
          type='text'
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
