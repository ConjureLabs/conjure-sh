import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Router from 'next/router'

import styles, { classes } from './styles.js'

export default class Button extends Component {
  handleOnClick() {
    const { onClick, disabled, href } = this.props

    if (disabled) {
      return
    }

    if (onClick) {
      onClick(new Event('Button Clicked'))
    }

    if (href) {
      Router.push(href)
    }
  }

  render() {
    const { className, children, color, size, hallow, disabled } = this.props

    const rootClasses = classnames(
      classes.root,
      classes[`color_${color}`],
      classes[`size_${size}`],
      hallow === true ? classes.hallow : null,
      className,
      disabled ? classes.disabled : null
    )

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
    )
  }

  static propTypes = {
    color: PropTypes.oneOf([
      'black',
      'blue',
      'gray',
      'peach',
      'pink',
      'purple',
      'red',
      'white'
    ]).isRequired,

    hallow: PropTypes.bool,

    onClick: PropTypes.func,

    size: PropTypes.oneOf([
      'large',
      'medium',
      'small'
    ]).isRequired,

    href: PropTypes.string
  }
}
