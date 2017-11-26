import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default class Button extends Component {
  handleOnClick() {
    const { onClick, disabled } = this.props;

    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(new Event('Button Clicked'));
    }
  }

  render() {
    const { className, children, color, size, hallow, disabled } = this.props;

    const rootClasses = classnames(
      classes.root,
      classes[`color_${color}`],
      classes[`size_${size}`],
      hallow === true ? classes.hallow : null,
      className,
      disabled ? classes.disabled : null
    );

    return (
      <span
        className={rootClasses}
        onClick={this.handleOnClick.bind(this)}
      >
        <span className={classes.label}>
          {children}
        </span>

        {styles}
      </span>
    );
  }

  static propTypes = {
    color: PropTypes.oneOf([
      'black',
      'blue',
      'gray',
      'peach',
      'pink',
      'purple',
      'white'
    ]).isRequired,

    hallow: PropTypes.bool,

    onClick: PropTypes.func,

    size: PropTypes.oneOf([
      'large',
      'medium',
      'small'
    ]).isRequired
  }
}
