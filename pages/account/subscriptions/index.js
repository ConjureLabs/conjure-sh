import { Component } from 'react'
import styles, { classes } from './styles.js'
import { connect } from '@conjurelabs/federal'
import classnames from 'classnames'
import sortInsensitive from '@conjurelabs/utils/Array/sort-insensitive'

import Button from 'components/Button'
import Page from 'components/Page'

class Subscriptions extends Component {
  render() {
    const { watchedRepos, otherRepos } = this.props

    const byOrg = {}

    sortInsensitive(watchedRepos, 'name')
    for (const repo of watchedRepos) {
      byOrg[repo.org] = byOrg[repo.org] || []
      byOrg[repo.org].push({
        ...repo,
        watched: true
      })
    }
    sortInsensitive(otherRepos, 'name')
    for (const repo of otherRepos) {
      byOrg[repo.org] = byOrg[repo.org] || []
      byOrg[repo.org].push({
        ...repo,
        watched: false
      })
    }

    const orgs = Object.keys(byOrg)
    sortInsensitive(orgs)

    return (
      <div className={classes.root}>
        {orgs.map((org, index) => (
          <div
            key={org}
            className={classnames({
              [classes.more]: index > 0
            })}
          >
            <h3>{org}</h3>
            <ol>
              {byOrg[org].map(repo => (
                <li key={`${org}/${repo.name}`}>
                  <h4>{repo.name}</h4>
                  {repo.watched === true ? (
                    <Button
                      size='small'
                      color='red'
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      size='small'
                      color='gray'
                      hallow={true}
                    >
                      Watch
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
        {styles}
      </div>
    )
  }
}

const selector = store => ({
  account: store.account
})

const ConnectedSubscriptions = connect(selector)(Subscriptions)

export default class SubscriptionsPage extends Page {
  render() {
    return (
      <this.Layout
        title='Repo Subscriptions'
        withWrapper={true}
      >
        <ConnectedSubscriptions {...this.props} />
      </this.Layout>
    )
  }
}
