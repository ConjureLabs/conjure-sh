import { Component } from 'react'
import styles, { classes } from './styles.js'
import config from '../../../../client.config.js'

import Layout from '../../../../components/Layout'
import EmptyState from '../../../../components/EmptyState'
import Button from '../../../../components/Button'

export default class RequiresAuth extends Component {
  constructor(props) {
    super(props)
    this.form = null // placeholder for form el ref
  }

  submitForm(e) {
    e.preventDefault()
    document.getElementById('redirection').value = window.location
    this.form.submit()
  }

  render() {
    const { url } = this.props

    return (
      <Layout
        url={url}
        title='Private Container'
        wrappedHeader={false}
      >
        <EmptyState
          className={classes.emptyState}
          emoji='🔒'
          headerText='This container is private'
          bodyText='You must sign into Conjure to view this content'
        />

        <form
          action={`${config.app.api.url}/auth/github`}
          className={classes.trueForm}
          method='post'
          ref={form => this.form = form}
        >
          <input
            id='redirection'
            type='text'
            name='redirection'
          />
        </form>

        <div className={classes.actionWrap}>
          <Button
            color='purple'
            size='medium'
            onClick={this.submitForm.bind(this)}
          >
            Sign In
          </Button>
        </div>

        {styles}
      </Layout>
    )
  }
}
