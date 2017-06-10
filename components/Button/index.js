import React, { Component, PropTypes } from 'react';
import styles, { classes } from './styles.js';
import classnames from 'classnames';

export default class Button extends Component {
  handleOnClick() {
    alert('CLICKED');
    const { onClick } = this.props;

    if (onClick) {
      onClick(new Event('Button Clicked'));
    }
  }

  render() {
    const { className, children, color, size, hallow } = this.props;

    const rootClasses = classnames(
      classes.root,
      classes[`color_${color}`],
      classes[`size_${size}`],
      hallow === true ? classes.hallow : null,
      className
    );

    return (
      <span
        className={rootClasses}
        onClick={() => { console.log('OMG F U CLICK EVENT'); }}
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
      'peach',
      'pink',
      'purple'
    ]).isRequired,

    hallow: PropTypes.bool,

    onClick: PropTypes.func,

    size: PropTypes.oneOf([
      'large',
      'small'
    ]).isRequired
  }
}
