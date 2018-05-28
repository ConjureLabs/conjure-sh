import { Component } from 'react'
import { get } from 'shared/xhr'
import actions from './actions'
import sysMessageActions from 'components/SystemMessages/actions'
import styles, { classes } from './styles.js'
import { connect } from '@conjurelabs/federal'
import config from 'client.config.js'
import classnames from 'classnames'

import Page from 'components/Page'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Timeline from './components/Timeline'

let activelyPullingDelta = false

class Dashboard extends Component {
  constructor(props) {
    super(props)

    // set at render
    this.orgDropdown = null
    this.repoDropdown = null

    // for setTimeout reference tracking
    this.timeouts = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch.clearTimeline(null, () => {
      this.pullTimeline()
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timeouts.deltaCheck)
  }

  pullTimeline(apiUrl, apiArgOverrides = {}) {
    const { dispatch, orgSelected, repoSelected } = this.props

    apiUrl = apiUrl || `${config.app.api.url}/api/containers/timeline`

    const apiArgs = {
      org: orgSelected,
      repo: repoSelected,
      page: 0,
      ...apiArgOverrides
    }

    get(apiUrl, apiArgs, (err, data) => {
      if (err) {
        return dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
      }

      dispatch.pushTimeline({
        addition: data.timeline,
        pagingHref: data.paging.next
      })

      this.queueDeltaCheck(data.delta)
    })
  }

  pullTimelineDelta() {
    if (activelyPullingDelta === true) {
      return
    }

    activelyPullingDelta = true

    const { dispatch, timeline, timelineDelta } = this.props
    const deltaFetched = []

    const finish = () => {
      dispatch.clearTimelineDelta({}, () => {
        activelyPullingDelta = false

        // should be not possible
        if (deltaFetched.length === 0) {
          return
        }

        dispatch.unshiftTimeline({
          addition: deltaFetched
        })
      })
    }

    const pullNext = (apiUrl, apiArgOverrides = {}) => {
      const { orgSelected, repoSelected, dispatch } = this.props

      apiUrl = apiUrl || `${config.app.api.url}/api/containers/timeline`

      // apiUrl should not be null, but will assume done if it is, anyway
      if (apiUrl === null || deltaFetched.length >= timelineDelta) {
        return finish()
      }

      const apiArgs = {
        org: orgSelected,
        repo: repoSelected,
        page: 0,
        ...apiArgOverrides
      }

      get(apiUrl, apiArgs, (err, data) => {
        if (err) {
          dispatch.addSystemMessage({
            type: 'error',
            message: err.message
          })
          activelyPullingDelta = false
          return
        }

        for (let i = 0; i < data.timeline.length; i++) {
          // assuming at least one timeline state record, since pullNext should not be able to be called otherwise
          if (data.timeline[i].id === timeline[0].id) {
            return finish()
          }
          deltaFetched.push(data.timeline[i])
        }

        // must have more rows to pull, so kicking off another request
        pullNext(data.paging.next)
      })
    }

    pullNext()
  }

  queueDeltaCheck(deltaUrl) {
    this.timeouts.deltaCheck = setTimeout(() => {
      this.checkDelta.bind(this)(deltaUrl)
    }, 30 * 1000)
  }

  checkDelta(deltaUrl) {
    const { dispatch } = this.props

    get(deltaUrl, null, (err, data) => {
      if (err) {
        return dispatch.addSystemMessage({
          type: 'error',
          message: err.message
        })
      }

      if (+data.count === 0) {
        return this.queueDeltaCheck(deltaUrl)
      }

      const { timeline } = this.props

      if (!timeline.length) {
        return this.pullTimeline()
      }

      dispatch.setTimelineDelta({
        delta: +data.count
      })

      this.queueDeltaCheck(deltaUrl)
    })
  }

  render() {
    const {
      orgs, repos,
      pagingHref, timelineDelta,
      additionalRepos,
      orgSelected, repoSelected
    } = this.props

    let orgsListed
    if (orgs.length === 1) {
      // if only 1 org available, force it to be defaulted (and no 'all option available')
      orgsListed = [{
        label: orgs[0],
        value: orgs[0]
      }]
    } else {
      // > 1 org available, give 'all orgs' option
      orgsListed = [{
        label: 'All Orgs',
        value: '*',
        className: classes.allOption
      }].concat(
        orgs.map(name => ({
          label: name,
          value: name
        }))
      )
    }

    let reposListed
    if (orgSelected === '*') {
      // if viewing 'all' orgs, then disallow repo selection
      reposListed = [{
        label: 'All Repos',
        value: '*'
      }]
    } else {
      // filter down all repos to selected org's repos
      const reposAvail = repos.filter(repo => repo.org === orgSelected)

      if (reposAvail.length === 1) {
        // if only 1 repo available, force it to be defaulted (and no 'all option available')
        reposListed = [{
          label: reposAvail[0].name,
          value: reposAvail[0].name
        }]
      } else {
        // > 1 repo available, give 'all repos' option
        reposListed = [{
          label: 'All Repos',
          value: '*',
          className: classes.allOption
        }].concat(
          reposAvail.map(repo => ({
            label: repo.name,
            value: repo.name
          }))
        )
      }
    }

    return (
      <div className={classes.root}>
        {isNaN(timelineDelta) || timelineDelta <= 0 ? null : (
          <div
            className={classes.viewNew}
          >
            <Button
              size='small'
              color='gray'
              hallow={true}
              className={classes.button}
              onClick={() => {
                this.pullTimelineDelta()
              }}
            >
              View {timelineDelta} new activit{timelineDelta === 1 ? 'y' : 'ies'}
            </Button>
          </div>
        )}

        <span className={classes.repoSelection}>
          <Dropdown
            ref={ref => this.orgDropdown = ref}
            label='Organization'
            options={orgsListed}
            value={orgSelected}
            className={classnames(classes.dropdown, classes.orgSelect)}
            onSelect={() => {
              const orgNewlySelected = this.orgDropdown.value
              window.location = `/?org=${orgNewlySelected}&repo=*`
            }}
          >
            <a
              className={classes.addNew}
              href={`https://github.com/apps/${config.services.github.app.name}/installations/new`}
            >
              + Add More
            </a>
          </Dropdown>

          <Dropdown
            ref={ref => this.repoDropdown = ref}
            label='Repo'
            options={reposListed}
            value={repoSelected}
            className={classes.dropdown}
            onSelect={() => {
              const repoNewlySelected = this.repoDropdown.value
              window.location = `/?org=${orgSelected}&repo=${repoNewlySelected}`
            }}
           >
            {!additionalRepos ? null : (
              <a
                className={classes.addNew}
                href={`/watch/repos${orgSelected === '*' ? '' : '?org=' + orgSelected}`}
              >
                + Add More
              </a>
            )}
          </Dropdown>
        </span>

        <Timeline />

        {!pagingHref ? null : (
          <div className={classnames(classes.wrap, classes.paging)}>
            <Button
              size='small'
              color='blue'
              hallow={true}
              onClick={() => {
                this.pullTimeline(pagingHref, null)
              }}
            >
              View More
            </Button>
          </div>
        )}

        {styles}
      </div>
    )
  }
}

const selector = store => ({
  timeline: store.timeline,
  pagingHref: store.pagingHref,
  timelineDelta: store.timelineDelta,
  containerStarting: store.containerStarting
})

const ConnectedDashbord = connect(selector, {
  ...actions,
  ...sysMessageActions
})(Dashboard)

export default class DashboardPage extends Page {
  render() {
    const { orgs, additional } = this.props
    let { repos, orgSelected, repoSelected } = this.props

    orgSelected = orgSelected === '*' && orgs.length === 1 ? orgs[0] : orgSelected
    
    if (orgSelected !== '*') {
      repos = repos.filter(repo => repo.org === orgSelected)
    }

    repoSelected = repoSelected === '*' && repos.length === 1 ? repos[0].name : repoSelected

    const title = repoSelected !== '*' ? repoSelected :
      orgSelected !== '*' ? orgSelected :
      'Conjure'

    let additionalRepos = false
    if (orgSelected !== '*') {
      additionalRepos = additional.reposByOrg[orgSelected] === true
    } else {
      for (const key of Object.keys(additional.reposByOrg)) {
        if (additional.reposByOrg[key] === true) {
          additionalRepos = true
          break
        }
      }
    }

    return (
      <this.Layout
        title={title}
      >
        <ConnectedDashbord
          orgs={orgs}
          repos={repos}
          orgSelected={orgSelected}
          repoSelected={repoSelected}
          additionalOrgs={additional.orgs}
          additionalRepos={additionalRepos}
        />
      </this.Layout>
    )
  }
}
