import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../../../components/Layout'
import Button from '../../../../components/Button'

export default ({ submitForm }) => (
  <div className={classes.root}>
    <nav>
      <h1>Conjure</h1>
      <a
        href=''
        onClick={this.submitForm}
      >
        Sign In
      </a>
    </nav>

    <div className={classes.ctaContainer}>
      <div className={classes.whatIsConjure}>
        <h2>Ephemeral Staging Deployments</h2>
        <p>Connect your GitHub projects and start viewing in minutes</p>
      </div>

      <div className={classes.buttons}>
        <Button
          size='large'
          className={classes.cta}
          color='white'
          hallow={false}
          onClick={this.submitForm}
        >
          <span className={classes.label}>Sign Up</span>
        </Button>

        <Button
          size='large'
          color='white'
          hallow={true}
          href='/docs'
          className={classes.secondary}
        >
          <span className={classes.label}>Explore the Docs</span>
        </Button>
      </div>
    </div>

    {styles}
  </div>
)
