import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

export default ({ emoji, headerText, bodyText, className }) => (
  <div className={classnames(classes.root, className)}>
    <div className={classes.header}>
      <sup>{emoji}</sup>
      <span>{headerText}</span>
    </div>

    <span className={classes.body}>
      {bodyText}
    </span>

    {styles}
  </div>
)
