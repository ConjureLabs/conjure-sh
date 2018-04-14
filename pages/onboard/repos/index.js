import { Component } from 'react'
import styles, { classes } from '../styles.js'
import { connect } from '@conjurelabs/federal'

import { post } from '../../../shared/xhr'
import config from '../../../shared/config.js'
import sysMessageActions from '../../../components/SystemMessages/actions'

import Layout from '../../../components/Layout'
import Button from '../../../components/Button'
import AnchorMultiList from '../../../components/AnchorList/MultiSelect'

let submitting = false

class OnboardRepos extends Component {
  constructor() {
    super()

    this.anchorList = null // set by ref

    this.state = {
      repoSelected: false
    }
  }

  isRepoSelected() {
    const listSelected = this.anchorList.selected
    this.setState({
      repoSelected: listSelected.length > 0
    })
  }

  submit() {
    if (submitting) {
      return
    }
    submitting = true

    const { dispatch } = this.props

    post(`${config.app.api.url}/api/onboard/repos/selection`, this.anchorList.selected.map(selection => selection.value), err => {
      if (err) {
        dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
        submitting = false
        return
      }

      window.location = '/'
    })
  }

  render() {
    const { reposByOrg, org } = this.props

    // repos are listed by org top-level key
    const orgs = Object.keys(reposByOrg)
    const repos = []
    for (let i = 0; i < orgs.length; i++) {
      const currentOrgKey = orgs[i]

      if (currentOrgKey !== org.label) {
        continue
      }

      for (let j = 0; j < reposByOrg[currentOrgKey].length; j++) {
        const repo = reposByOrg[currentOrgKey][j]

        repos.push({
          label: repo.name,
          value: repo.id,
          key: repo.id
        })
      }
    }

    return (
      <div>
        <div className={classes.content}>
          <header>
            <sup>🎟</sup>
            <span>Almost there!</span>
          </header>

          <article>
            <sup>4</sup>
            <span>What repos should Conjure watch?</span>
          </article>

          <main>
            <div className={classes.listOuterWrap}>
              <span className={classes.listWrap}>
                <AnchorMultiList
                  list={repos}
                  className={classes.anchorList}
                  onSelect={this.isRepoSelected.bind(this)}
                  ref={ref => this.anchorList = ref}
                />

                <Button
                  size='medium'
                  color='blue'
                  onClick={this.submit.bind(this)}
                  className={classes.button}
                  disabled={!this.state.repoSelected}
                >
                  Continue
                </Button>
              </span>
            </div>
          </main>
        </div>

        {styles}
      </div>
    )
  }
}

const ConnectedOnboardRepos = connect(state => {}, sysMessageActions)(OnboardRepos)

export default ({ url, ...extraProps }) => {
  return (
    <Layout
      url={url}
      limitedHeader={true}
    >
      <ConnectedOnboardRepos
        {...extraProps}
        reposByOrg={url.query.repos}
        org={url.query.org}
      />
    </Layout>
  )
}
