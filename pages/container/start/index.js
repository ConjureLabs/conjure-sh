import styles, { classes } from './styles.js'

import Page from 'components/Page'
import Loader from 'components/Loader'
import TitleCased from 'components/TitleCased'

export default class ContainerStart extends Page {
  render() {
    const { orgName, repoName, title, containerState } = this.props

    return (
      <this.Layout
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
      </this.Layout>
    )
  }
}
