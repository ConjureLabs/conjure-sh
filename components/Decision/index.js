import React, { Component, PropTypes } from 'react';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

import Button from '../Button';

export default class Decision extends Component {
  handleClick(type) {
    const { onPrimaryClick, onSecondaryClick, disabled } = this.props;

    if (disabled) {
      return;
    }

    const handler = type === 'primary' ? onPrimaryClick :
      type === 'secondary' ? onSecondaryClick :
      null;

    if (handler) {
      handler(new Event('Button Clicked'));
    }
  }

  render() {
    const { className, secondaryText, hallow, disabled, size, color } = this.props;

    const rootClasses = classnames(
      classes.root,
      className
    );

    return (
      <span className={rootClasses}>
        <Button
          className={classes.secondary}
          onClick={this.handleClick.bind(this, 'secondary')}
          disabled={disabled === true}
          hallow={hallow === true}
          size={size}
          color='gray'
        >
          {secondaryText}
        </Button>

        <Button
          className={classes.primary}
          onClick={this.handleClick.bind(this, 'primary')}
          disabled={disabled === true}
          hallow={hallow === true}
          size={size}
          color={color}
        >
          {primaryText}
        </Button>
      </span>
    );
  }
}