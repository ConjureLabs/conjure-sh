import styles, { classes } from './styles.js'

import config from 'client.config.js'
import Page from 'components/Page'
import LandingHeader from './components/LandingHeader'
import FeaturesCallout from './components/FeaturesCallout'
import FinalEffort from './components/FinalEffort'

export default class Landing extends Page {
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
      <this.Layout
        withHeader={false}
        withWrapper={false}
        contentPadded={false}
        className={classes.root}
      >
        <form
          action={`${config.app.api.url}/auth/github`}
          className={classes.trueForm}
          method='post'
          ref={form => this.form = form}
        />

        <LandingHeader
          submitForm={this.submitForm}
        />
        <FeaturesCallout />
        <FinalEffort
          submitForm={this.submitForm}
        />

        {styles}
      </this.Layout>
    )
  }
}
