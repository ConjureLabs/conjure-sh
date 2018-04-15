import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
import TitleCased from '../../../components/TitleCased'

export default class ContainerStart extends Component {
  render() {
    const { url } = this.props
    const { query } = url
    const { orgName, repoName, title, containerState } = query

    return (
      <Layout
        url={url}
        title={`${orgName}/${repoName} -- ${title}`}
      >
        <div className={classes.content}>
          <main className={classes.list}>
            <article className={classes.pending}>
              {
                containerState === 'spinning up' || containerState === 'updating' ? (
                  <Loader
                    size='small'
                    className={classes.loader}
                  />
                ) : containerState === 'running' ? (
                  <span className={classes.emoji}>✅</span>
                ) : null
              }
              <TitleCased className={classes.text}>{containerState}</TitleCased>
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
