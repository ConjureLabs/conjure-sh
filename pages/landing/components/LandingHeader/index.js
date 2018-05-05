import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../../../components/Layout'
import Button from '../../../../components/Button'
import config from '../../../../client.config.js'

export default class LandingHeader extends Component {
  constructor(props) {
    super(props)
    this.form = null // placehoder for form el ref
  }

  submitForm = e => {
    e.preventDefault()
    this.form.submit()
  }

  render() {
    return (
      <div className={classes.root}>
        <form
          action={`${config.app.api.url}/auth/github`}
          className={classes.trueForm}
          method='post'
          ref={form => this.form = form}
        />

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
            >
              <span className={classes.label}>Explore the Docs</span>
            </Button>
          </div>
        </div>

        {styles}
      </div>
    )
  }
}
