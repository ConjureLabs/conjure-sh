import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../components/Layout'
import LandingHeader from './components/LandingHeader'

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.form = null // placehoder for form el ref
  }

  submitForm = e => {
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
        <LandingHeader/>

        {styles}
      </Layout>
    )
  }
}
