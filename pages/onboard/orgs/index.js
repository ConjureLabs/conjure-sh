import { Component } from 'react'
import styles, { classes } from '../styles.js'
import { connect } from '@conjurelabs/federal'

import { post } from '../../../shared/xhr'
import config from '../../../client.config.js'
import sysMessageActions from '../../../components/SystemMessages/actions'

import Layout from '../../../components/Layout'
import Header from '../../../components/Header'
import AnchorList from '../../../components/AnchorList'

let submitting = false

class OnboardOrgs extends Component {
  makeSelection(item) {
    // {label: "ConjureLabs", value: 1783213}
    if (submitting) {
      return
    }
    submitting = true

    const { dispatch } = this.props

    post(`${config.app.api.url}/api/onboard/orgs/selection`, item, err => {
      if (err) {
        dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
        submitting = false
        return
      }

      window.location = '/onboard/payment'
    })
  }

  render() {
    const { orgs } = this.props

    return (
      <div>
        <div className={classes.content}>
          <header>
            <sup>👋</sup>
            <span>Welcome to Conjure! Let's get started.</span>
          </header>

          <article>
            <sup>1</sup>
            <span>Select the GitHub organization or account you'd like to use with Conjure</span>
          </article>

          <main>
            <AnchorList
              list={orgs.map(org => {
                return {
                  label: org.login,
                  value: org.id,
                  key: org.id
                }
              })}
              onSelect={this.makeSelection.bind(this)}
              className={classes.anchorList}
            />
          </main>
        </div>

        {styles}
      </div>
    )
  }
}

const ConnectedOnboardOrgs = connect(() => {}, sysMessageActions)(OnboardOrgs)

export default ({ url, ...extraProps }) => {
  return (
    <Layout
      url={url}
      limitedHeader={true}
    >
      <ConnectedOnboardOrgs
        {...extraProps}
        orgs={url.query.orgs}
      />
    </Layout>
  )
}
