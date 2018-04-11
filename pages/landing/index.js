import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../components/Layout'
import Button from '../../components/Button'
import config from '../../shared/config.js'

import Glimpse from './components/Glimpse'
import Plans from './components/Plans'

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.form = null // placehoder for form el ref
  }

  submitForm(e) {
    e.preventDefault()
    this.form.submit()
  }

  render() {
    const { url } = this.props

    return (
      <Layout
        url={url}
        withHeader={false}
        withWrapper={false}
        className={classes.root}
      >
        <form
          action={`${config.app.api.url}/auth/github`}
          className={classes.trueForm}
          method='post'
          ref={form => this.form = form}
        />

        <header className={classes.header}>
          <nav className={classes.navigation}>
            <h1 className={classes.serviceName}>Conjure</h1>

            <ol className={classes.linkslist}>
              <li className={classes.item}>
                <Button
                  size='small'
                  color='white'
                  onClick={this.submitForm.bind(this)}
                  hallow={true}
                >
                  Sign In
                </Button>
              </li>
            </ol>
          </nav>

          <div className={classes.ctaContainer}>
            <div className={classes.firstImpression}>
              On-Demand Deployment for Pull Requests
              <p>Easily sync your GitHub projects with Conjure and start viewing in minutes!</p>
            </div>

            <div>
              <Button
                size='large'
                className={classes.cta}
                color='white'
                onClick={this.submitForm.bind(this)}
              >
                <span className={classes.label}>Sign Up</span>
              </Button>
              <sub className={classes.info}>2 containers free, for 2 weeks</sub>
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

            <sub>2 containers free, for 2 weeks</sub>
          </div>
        </div>

        <div className={classes.sell} id='#how-it-works'>
          <div>
            <article>
              <header>
                <h3>For Developers</h3>
                <span>Conjure streamlines the peer review process, letting engineers focus on what they do best, avoiding context switch.</span>
              </header>

              <ol>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>View changes easily</span>
                </li>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>Tail logs</span>
                </li>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>GitHub integration</span>
                </li>
              </ol>
            </article>

            <article>
              <header>
                <h3>For Product</h3>
                <span>Conjure gives visibility into what changes your team is working on. See changes before they ship, and give feedback to engineers and design.</span>
              </header>

              <ol>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>View changes easily</span>
                </li>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>Know what's in progress</span>
                </li>
                <li>
                  <span className={classes.gotIt}>✓</span>
                  <span className={classes.label}>Give developers feedback</span>
                </li>
              </ol>
            </article>
          </div>
        </div>

        <div className={classnames(classes.ctaContainer, classes.standAlone)}>
          <div>
            <Button
              size='large'
              className={classes.cta}
              color='black'
              onClick={this.submitForm.bind(this)}
            >
              <span className={classes.label}>Get Started</span>
            </Button>
            <sub className={classes.info}>With GitHub</sub>
          </div>
        </div>

        {styles}
      </Layout>
    )
  }
}
