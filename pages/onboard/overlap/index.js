import { Component } from 'react'
import styles, { classes } from '../styles.js'
import { connect } from '@conjurelabs/federal'

import { post } from 'shared/xhr'
import config from 'client.config.js'
import sysMessageActions from 'components/SystemMessages/actions'

import Page from 'components/Page'
import AnchorList from 'components/AnchorList'
import Decision from 'components/Decision'

// eslint thinks this var is not used, even though it is
let submitting = false // eslint-disable-line no-unused-vars

class OnboardOverlap extends Component {
  handleSkip() {
    submitting = true

    const { dispatch } = this.props

    post(`${config.app.api.url}/api/onboard/skip`, {}, err => {
      if (err) {
        dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
        submitting = false
        return
      }

      window.location = '/'
    })
  }

  render() {
    const { orgsAlreadyAvailable } = this.props

    return (
      <div>
        <div className={classes.content}>
          <header>
            <sup>👋</sup>
            <span>Welcome to Conjure! Let's get started.</span>
          </header>

          <article>
            <span>
              {
                orgsAlreadyAvailable.length === 1 ? `Looks like there's already an Org on Conjure that you have access to:` :
                  `Looks like there are already ${orgsAlreadyAvailable.length} Orgs on Conjure that you have access to:`
              }
            </span>
          </article>

          <main className={classes.textListWrap}>
            <ol className={classes.textList}>
              {orgsAlreadyAvailable.map(org => {
                return (
                  <li key={org}>
                    {org}
                  </li>
                )
              })}
            </ol>

            <Decision
              className={classes.decision}
              size='medium'
              color='blue'
              primaryText='Skip to Dashboard'
              secondaryText='Set up a different Org'
              onPrimaryClick={this.handleSkip.bind(this)}
              onSecondaryClick={() => {
                window.location = `https://github.com/apps/${config.services.github.app.name}/installations/new`
              }}
            />
          </main>
        </div>

        {styles}
      </div>
    )
  }
}

const ConnectedOnboardOverlap = connect(() => {}, sysMessageActions)(OnboardOverlap)

export default class OnboardOverlapPage extends Page {
  render() {
    const { orgsAlreadyAvailable, ...otherProps } = this.props

    return (
      <this.Layout
        limitedHeader={true}
      >
        <ConnectedOnboardOverlap
          {...otherProps}
          orgsAlreadyAvailable={orgsAlreadyAvailable}
        />
      </this.Layout>
    )
  }
}
