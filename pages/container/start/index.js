import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'

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
          <main className={classes.list}>
            <article className={classes.pending}>
              <Loader
                size='small'
                className={classes.loader}
              />
              <span className={classes.text}>Starting</span>
            </article>
          </main>

          <div className={classes.canRedirect}>
            <a href='/'>Click here</a> to view every containers' activity
          </div>
        </div>

        {styles}
      </Layout>
    )
  }
}
