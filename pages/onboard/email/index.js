import { Component } from 'react'
import styles, { classes } from './styles.js'
import { connect } from '@conjurelabs/federal'

import { post } from '../../../shared/xhr'
import config from '../../../client.config.js'
import sysMessageActions from '../../../components/SystemMessages/actions'

import Layout from '../../../components/Layout'
import Button from '../../../components/Button'
import TextInput from '../../../components/Input/Text'

let submitting = false

class OnboardEmail extends Component {
  constructor(props) {
    super(props)

    // tracking refs to form inputs, so we can build a submission payload
    this.inputs = {
      emailInput: null // filled in via ref attr
    }

    this.state = {
      formFilledIn: false
    }
  }

  isFormFilledIn() {
    this.setState({
      formFilledIn: /^.+@.+\..+$/.test(this.emailInput.value.trim())
    })
  }

  submit() {
    if (submitting) {
      return
    }
    submitting = true

    const { dispatch } = this.props

    post(`${config.app.api.url}/api/onboard/email/selection`, {
      email: this.emailInput.value.trim()
    }, err => {
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
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <header>
            <sup>📧</sup>
            <span>Where can we reach you?</span>
          </header>

          <article>
            <span>We need your email to complete registration</span>
          </article>

          <main className={classes.container}>
            <div className={classes.inputWrap}>
              <TextInput
                className={classes.formInput}
                maxLength='255'
                label='Email'
                ref={ref => this.emailInput = ref}
                onChange={this.isFormFilledIn.bind(this)}
              />
            </div>

            <Button
              size='medium'
              color='blue'
              onClick={this.submit.bind(this)}
              className={classes.button}
              disabled={!this.state.formFilledIn}
            >
              Continue
            </Button>
          </main>
        </div>

        {styles}
      </div>
    )
  }
}

const ConnectedOnboardEmails = connect(() => {}, sysMessageActions)(OnboardEmail)

export default ({ url, ...extraProps }) => {
  return (
    <Layout
      url={url}
      limitedHeader={true}
    >
      <ConnectedOnboardEmails
        {...extraProps}
        reposByOrg={url.query.repos}
      />
    </Layout>
  )
}
