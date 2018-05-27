import { Component } from 'react'
import styles, { classes } from './styles.js'
import { connect } from '@conjurelabs/federal'
import classnames from 'classnames'
import sortInsensitive from '@conjurelabs/utils/Array/sort-insensitive'
import { post } from 'shared/xhr'

import Page from 'components/Page'
import Button from 'components/Button'
import DangerZoneConfirm from 'components/DangerZoneConfirm'

let submitting = false

class Subscriptions extends Component {
  constructor(props) {
    super(props)

    // state will allow us to change state of each row
    // while props will determine order in rendering
    this.state = {
      confirmRevoke: null,
      watchedReposStateMapping: props.watchedRepos.reduce((mapping, current) => {
        mapping[current.id] = true
        return mapping
      }, {})
    }
  }

  render() {
    const { watchedRepos, otherRepos } = this.props
    const { confirmRevoke, watchedReposStateMapping } = this.state

    const byOrg = {}

    sortInsensitive(watchedRepos, 'name')
    for (const repo of watchedRepos) {
      byOrg[repo.org] = byOrg[repo.org] || []
      byOrg[repo.org].push({
        ...repo,
        watched: watchedReposStateMapping[repo.id] === true
      })
    }
    sortInsensitive(otherRepos, 'name')
    for (const repo of otherRepos) {
      byOrg[repo.org] = byOrg[repo.org] || []
      byOrg[repo.org].push({
        ...repo,
        watched: watchedReposStateMapping[repo.id] === true
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
                <li key={repo.id}>
                  <h4>{repo.name}</h4>
                  {repo.watched === true ? (
                    <Button
                      size='small'
                      color='red'
                      onClick={() => {
                        ths.setState({
                          confirmRevoke: repo
                        })
                      }}
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      size='small'
                      color='gray'
                      hallow={true}
                      onClick={() => {
                        if (submitting === true) {
                          return
                        }
                        submitting = true

                        post(`${config.app.api.url}/api/repo/watch`, repo, err => {
                          if (err) {
                            dispatch.addSystemMessage({
                              type: 'error',
                              message: err.message
                            })
                            submitting = false
                            return
                          }

                          this.setState({
                            watchedReposStateMapping: {
                              ...watchedReposStateMapping,
                              [repo.id]: true
                            }
                          }, () => {
                            submitting = false
                          })
                        })
                      }}
                    >
                      Watch
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}

        {!confirmRevoke ? null : (
          <DangerZoneConfirm
            subjectLabel='Repo Name'
            expectedEntry={confirmRevoke.name}
            onCancel={() => {
              this.setState({
                confirmRevoke: null
              })
            }}
            onConfirm={() => {
              if (submitting) {
                return
              }
              submitting = true

              post(`${config.app.api.url}/api/repo/revoke`, confirmRevoke, err => {
                if (err) {
                  dispatch.addSystemMessage({
                    type: 'error',
                    message: err.message
                  })
                  submitting = false
                  return
                }

                this.setState({
                  watchedReposStateMapping: {
                    ...watchedReposStateMapping,
                    [confirmRevoke.id]: null
                  }
                }, () => {
                  submitting = false
                })
              })
            }}
          />
        )}

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
