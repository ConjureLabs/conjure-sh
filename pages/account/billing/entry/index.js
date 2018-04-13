import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'
import { connect } from '@conjurelabs/federal'

import { post } from '../../../../shared/xhr'
import config from '../../../../shared/config.js'
import sysMessageActions from '../../../../components/SystemMessages/actions'

import Layout from '../../../../components/Layout'
import TextInput from '../../../../components/Input/Text'
import CreditCardInput from '../../../../components/Input/CreditCard'
import CountrySuggestInput from '../../../../components/Input/Suggest/Country'
import UsStateSuggest from '../../../../components/Input/Suggest/UsState'
import MonthInput from '../../../../components/Input/Month'
import YearInput from '../../../../components/Input/Year'
import NumberInput from '../../../../components/Input/Number'
import Button from '../../../../components/Button'

let submitting = false

// todo: this has A LOT of overlap w/ the onboard billing flow - how to keep it DRY?

class AccountBillingEntry extends Component {
  constructor(props) {
    super(props)

    // tracking refs to form inputs, so we can build a submission payload
    this.inputs = {
      card: {}, // filled in via ref attrs
      address: {} // filled in via ref attrs
    }

    this.state = {
      formFilledIn: false
    }
  }

  isFormFilledIn() {
    const cardKeys = Object.keys(this.inputs.card)
    for (let i = 0; i < cardKeys.length; i++) {
      if (!this.inputs.card[ cardKeys[i] ].value) {
        this.setState({
          formFilledIn: false
        })
        return
      }
    }

    const addressKeys = Object.keys(this.inputs.address)
    for (let i = 0; i < addressKeys.length; i++) {
      // addr2 is not required
      if (addressKeys[i] === 'addr2') {
        continue
      }

      if (!this.inputs.address[ addressKeys[i] ].value) {
        this.setState({
          formFilledIn: false
        })
        return
      }
    }

    this.setState({
      formFilledIn: true
    })
  }

  submit() {
    if (submitting) {
      return
    }
    submitting = true

    const { dispatch } = this.props

    const values = {}
    const inputCategories = Object.keys(this.inputs)
    for (let i = 0; i < inputCategories.length; i++) {
      let category = inputCategories[i]

      values[category] = Object.keys(this.inputs[category]).reduce((mapping, inputKey) => {
        mapping[inputKey] = this.inputs[category][inputKey].value
        return mapping
      }, {})
    }

    post(`${config.app.api.url}/api/account/billing/card`, values, err => {
      if (err) {
        dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
        submitting = false
        return
      }

      window.location = '/account/billing'
    })
  }

  render() {
    const { url } = this.props

    return (
      <div>
        <div className={classes.sectionsParent}>
          <section>
            <span className={classes.sectionLabel}>Card</span>

            <ol>
              <li>
                <CreditCardInput
                  className={classes.formInput}
                  label='Number'
                  ref={ref => this.inputs.card.number = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <TextInput
                  className={classes.formInput}
                  label='Name'
                  ref={ref => this.inputs.card.name = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <MonthInput
                  className={classnames(classes.formInput, classes.short)}
                  label='MM'
                  ref={ref => this.inputs.card.mm = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
                <YearInput
                  className={classnames(classes.formInput, classes.short)}
                  label='YYYY'
                  start={new Date().getFullYear()}
                  end={new Date().getFullYear() + 20}
                  ref={ref => this.inputs.card.yyyy = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <NumberInput
                  className={classes.formInput}
                  maxLength='4'
                  label='CVC'
                  ref={ref => this.inputs.card.cvc = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
            </ol>
          </section>

          <section>
            <span className={classes.sectionLabel}>Billing Address</span>

            <ol>
              <li>
                <CountrySuggestInput 
                  className={classes.formInput}
                  label='Country'
                  ref={ref => this.inputs.address.country = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <NumberInput
                  className={classes.formInput}
                  maxLength='5'
                  label='Zip'
                  ref={ref => this.inputs.address.zip = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <UsStateSuggest 
                  className={classes.formInput}
                  label='State'
                  ref={ref => this.inputs.address.state = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <TextInput
                  className={classes.formInput}
                  maxLength='200'
                  label='City'
                  ref={ref => this.inputs.address.city = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <TextInput
                  className={classes.formInput}
                  maxLength='200'
                  label='Address'
                  ref={ref => this.inputs.address.addr1 = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
              <li>
                <TextInput
                  className={classes.formInput}
                  maxLength='200'
                  label='Apt / Suite'
                  ref={ref => this.inputs.address.addr2 = ref}
                  onChange={this.isFormFilledIn.bind(this)}
                />
              </li>
            </ol>
          </section>
        </div>

        <Button
          size='medium'
          color='blue'
          onClick={this.submit.bind(this)}
          className={classes.button}
          disabled={!this.state.formFilledIn}
        >
          Add Card
        </Button>

        {styles}
      </div>
    )
  }
}

const ConnectedAccountBillingEntry = connect(state => {}, sysMessageActions)(AccountBillingEntry)

export default ({ url, ...extraProps }) => {
  return (
    <Layout
      url={url}
      title='New Credit Card'
    >
      <ConnectedAccountBillingEntry {...extraProps} />
    </Layout>
  )
}
