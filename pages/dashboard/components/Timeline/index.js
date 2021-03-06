import { Component } from 'react'
import styles, { classes } from './styles.js'
import { connect } from '@conjurelabs/federal'
import classnames from 'classnames'
import moment from 'moment'

import EmptyState from 'components/EmptyState'
import TitleCased from 'components/TitleCased'

// in seconds
const minute = 60
const hour = 60 * minute
const day = 24 * hour

const exprAllSpaces = /\s+/g

class Timeline extends Component {
  constructor(props) {
    super(props)

    // for interval reference tracking
    this.intervals = {}
  }

  componentDidMount() {
    // forcing timestamps to update every 2 minutes
    this.intervals.forcedUpdate = setInterval(() => {
      this.forceUpdate()
    }, 2 * 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervals.forcedUpdate)
  }

  prepareTimeline() {
    const { timeline, containerStarting } = this.props

    if (timeline === null) {
      return null
    }

    // generate some extra fields
    return timeline.map(item => {
      let ms
      let duration

      findDuration: {
        switch (item.state) {
          case 'pending':
          case 'spinning up':
            duration = '-'
            break findDuration

          case 'running':
          case 'updating':
          case 'spinning down':
            ms = new Date() - new Date(item.start)
            break

          case 'stopped':
          case 'pruned':
          case 'failed':
            if (!item.stop) {
              duration = '-'
              break findDuration
            }
            ms = new Date(item.stop) - new Date(item.start)
            break
        }

        if (typeof ms === 'number') {
          let remainingSeconds = Math.ceil(ms / 1000)
          let durationDays = Math.floor(remainingSeconds / day)
          remainingSeconds %= day
          let durationHours = Math.floor(remainingSeconds / hour)
          remainingSeconds %= hour
          let durationMinutes = Math.floor(remainingSeconds / minute)
          let durationSeconds = remainingSeconds % minute

          if (durationDays === 0 && durationHours === 0 && durationMinutes === 0) {
            duration = `${durationSeconds} second${durationSeconds === 1 ? '' : 's'}`
          } else if (durationDays === 0 && durationHours === 0) {
            duration = minute / 2 < durationSeconds ? `${durationMinutes + 1} minutes` : `${durationMinutes} minute${durationMinutes === 1 ? '' : 's'}`
          } else if (durationDays === 0) {
            duration = hour / 2 < (durationMinutes * minute) ? `${durationHours + 1} hours` : `${durationHours} hour${durationHours === 1 ? '' : 's'}`
          } else {
            duration = day / 2 < (durationHours * hour) ? `${durationDays + 1} days` : `${durationDays} day${durationDays === 1 ? '' : 's'}`
          }
        }
      }

      const highlight = containerStarting && containerStarting.id === item.id

      return {
        ...item,
        duration,
        highlight,
        repoUrl: `https://github.com/${item.org}/${item.repo}/`,
        branchUrl: `https://github.com/${item.org}/${item.repo}/tree/${item.branch}`
      }
    })
  }

  mockRender() {
    const filler = ['Today', null, null, null, 'Yesterday', null, null]

    const fillerContent = filler.map((dayHeaderText, i) => {
      return (
        <article
          className={classes.row}
          key={`filler-${i}`}
        >
          {
            dayHeaderText === null ? null : (
              <header>
                <ol className={classes.list}>
                  <li className={classes.status}>{dayHeaderText}</li>
                  <li className={classes.logs}></li>
                  <li className={classes.repo}>Repo</li>
                  <li className={classes.branch}>Branch</li>
                  <li className={classes.duration}>Duration</li>
                </ol>
              </header>
            )
          }

          <ol className={classes.list}>
            <li className={classnames(classes.status, classes.spundown)}>
              <sup />
              <del />
            </li>

            <li className={classes.logs}></li>

            <li className={classes.repo}>
              <sup className={classes.svgIcon} />
              <del />
            </li>

            <li className={classes.branch}>
              <sup className={classes.svgIcon} />
              <del />
            </li>

            <li className={classes.duration}>
              <del />
            </li>
          </ol>
        </article>
      )
    })

    return (
      <div className={classnames(classes.wrap, classes.filler)}>
        {fillerContent}
        {styles}
      </div>
    )
  }

  render() {
    const timelinePrepared = this.prepareTimeline()
    
    if (!Array.isArray(timelinePrepared)) {
      return this.mockRender()
    }

    if (!timelinePrepared.length) {
      return (
        <div className={classes.wrap}>
          <EmptyState
            className={classes.emptyState}
            emoji='🤖'
            headerText={`There's no activity yet`}
            bodyText='Containers will spin up automatically whenever you create a Pull Request in GitHub'
          />

          <span className={classes.subtext}>Make sure you have added the <a href='/docs'>Conjure YML config file</a> to your project</span>

          {styles}
        </div>
      )
    }

    // `day` is in seconds, need it in ms
    const dayMs = day * 1000

    // setting timeline date header to tomorrow, so that it triggers on first pass
    let headerDay = new Date()
    headerDay.setDate(headerDay.getDate() + 1)
    // converting date object to number of days
    // `day` is in seconds, need to convert to ms
    headerDay = Math.floor(headerDay / dayMs)

    const today = Math.floor(new Date() / dayMs)
    const yesterday = today - 1

    return (
      <div className={classes.wrap}>
        {
          timelinePrepared.map(item => {
            // check if we should inject a new date header
            let dateHeader
            const itemStartDay = Math.floor(new Date(item.start) / dayMs)

            if (itemStartDay !== headerDay) {
              headerDay = itemStartDay
              dateHeader = (
                <header key={`day-${headerDay}`}>
                  <ol className={classes.list}>
                    <li className={classes.status}>
                      {
                        headerDay === today ? 'Today' :
                          headerDay === yesterday ? 'Yesterday' :
                          moment(new Date(headerDay * dayMs)).format('ll')
                      }
                    </li>
                    <li className={classes.logs} />
                    <li className={classes.repo}>Repo</li>
                    <li className={classes.branch}>Branch</li>
                    <li className={classes.duration}>Duration</li>
                  </ol>
                </header>
              )
            }

            // if container is running, link to it
            const statusNode = item.state === 'updating' || item.state === 'running' ? (
              <a
                key={`running-instance-${item.id}`}
                target='_blank'
                href={item.view}
              >
                View
              </a>
            ) : (
              <TitleCased>
                {item.state === 'pruned' ? 'stopped' : item.state}
              </TitleCased>
            )

            // if container is running, link to logs
            // todo: remove `false` when logs are ready
            // const logsNode = item.state === 'updating' || item.state === 'running' ? (
            //   <a
            //     key={`running-logs-${item.id}`}
            //     target='_blank'
            //     href={item.logs}
            //     className={classes.viewLogs}
            //   >
            //     Logs
            //   </a>
            // ) : (' ')
            const logsNode = (' ')

            const stateClassKey = item.state.replace(exprAllSpaces, '_')

            return (
              <article
                className={classes.row}
                key={item.id}
              >
                {dateHeader}

                <ol className={classnames({
                  [classes.list]: true,
                  [classes.highlight]: item.highlight === true
                })}>
                  <li className={classnames(classes.status, classes[stateClassKey])}>
                    <sup />
                    {statusNode}
                  </li>

                  <li className={classes.logs}>
                    {logsNode}
                  </li>

                  <li className={classnames({
                    [classes.repo]: true,
                    [classes.privateRepo]: item.repoPrivate === true
                  })}>
                    <sup className={classes.svgIcon} />
                    <a
                      href={item.repoUrl}
                      target='_blank'
                    >
                      {item.repo}
                    </a>
                  </li>

                  <li className={classes.branch}>
                    <sup className={classes.svgIcon} />
                    <a
                      href={item.branchUrl}
                      target='_blank'
                    >
                      {item.branch}
                    </a>
                  </li>

                  <li className={classes.duration}>
                    {item.duration}
                  </li>
                </ol>
              </article>
            )
          })
        }

        {styles}
      </div>
    )
  }
}

const selector = store => ({
  timeline: store.timeline,
  containerStarting: store.containerStarting
})

export default connect(selector)(Timeline)
