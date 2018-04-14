import { Component } from 'react'
import styles, { classes } from './styles.js'

import Layout from '../../../components/Layout'

export default class ContainerStart extends Component {
  render() {
    const { url } = this.props
    const { query } = url
    const { orgName, repoName, title } = query

    return (
      <Layout
        url={url}
        title={`${orgName}/${repoName} -- ${title}`}
      >
        <div className={classes.content}>
          asdf
        </div>

        {styles}
      </Layout>
    )
  }
}
