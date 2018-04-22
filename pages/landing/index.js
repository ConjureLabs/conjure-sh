import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../components/Layout'
import Button from '../../components/Button'
import config from '../../shared/config.js'

import Glimpse from './components/Glimpse'
import Plans from './components/Plans'

export default class Landing extends Component {
  render() {
    const { url } = this.props

    return (
      <Layout
        url={url}
        withHeader={false}
        withWrapper={false}
        className={classes.root}
      >
        <header className={classes.header}>
          <nav className={classes.navigation}>
            <h1 className={classes.serviceName}>Conjure</h1>
          </nav>

          <div className={classes.ctaContainer}>
            <div className={classes.firstImpression}>
              Ephemeral Staging Deployments
              <p>Connect your GitHub projects and start viewing in minutes</p>
            </div>

            <div>
              <Button
                size='large'
                className={classes.cta}
                color='white'
                disabled
                hallow
              >
                <span className={classes.label}>Coming Soon</span>
              </Button>
            </div>
          </div>

          <Glimpse className={classes.glimpse} />
        </header>

        <div className={classes.plans}>
          <div>
            <header>
                <h3>A Plan for Every Team</h3>
            </header>

            <Plans />
          </div>
        </div>

        {styles}
      </Layout>
    )
  }
}
