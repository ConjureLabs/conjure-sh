import { Component } from 'react'
import styles, { classes } from './styles.js'
import classnames from 'classnames'

export default class Glimpse extends Component {
  constructor(props) {
    super(props)

    this.conjureContent = null // component ref, set via render

    this.state = {
      inViewport: false // once true, will not be set back
    }

    if (typeof window !== 'undefined' && window.addEventListener) {
      const boundHandler = this.checkIfInViewport.bind(this)

      window.addEventListener('scroll', boundHandler)
      window.addEventListener('resize', boundHandler)

      this.removeBoundHandler = () => {
        window.removeEventListener('scroll', boundHandler)
        window.removeEventListener('resize', boundHandler)
      }
    } else {
      // if can't add listeners, then just force state
      try {
        this.setState({
          inViewport: true
        })
      } catch (err) {}
    }
  }

  checkIfInViewport() {
    if (!this.conjureContent || this.state.inViewport) {
      return
    }

    const rect = this.conjureContent.getBoundingClientRect()
    const html = document.documentElement

    if (
      !(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
      )
    ) {
      return
    }

    try {
      this.setState({
        inViewport: true
      }, () => {
        if (this.removeBoundHandler) {
          this.removeBoundHandler()
        }
      })
    } catch (err) {}
  }

  render() {
    const { inViewport } = this.state
    const { className } = this.props

    return (
      <div
        className={classnames(classes.root, className)}
        ref={ref => {
          this.conjureContent = ref
          this.checkIfInViewport()
        }}
      >
        <div className={classes.toolbar}>
          <ins />
          <ins />
          <ins />
        </div>

        <div className={classes.content}>
          <ins>Open</ins>
          <span className={classes.title}>New Sidebar</span>

          <span className={classnames(classes.commentWrap, classes.first)}>
            <span className={classes.author} />

            <span className={classes.comment}>
              <div className={classes.header}>
                <span className={classes.handle}>tmarshall</span>

                commented one minute ago
              </div>

              <span className={classes.body}>Updated the sidebar so that it's easier for users to get to settings</span>
            </span>
          </span>

          <ol className={classes.timeline}>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>added new dropdown</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>styled sidebar changes</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>tweaks from design</span>
            </li>
            <li>
              <span className={classes.author} />
              <span className={classes.commit}>changed some label text</span>
            </li>
          </ol>

          <span className={classes.commentWrap}>
            <span
              className={classnames(classes.comment, classes.fromConjure, {
                [classes.inViewport]: inViewport
              })}
            >
              <div className={classes.header}>
                <span className={classes.handle}>Conjure</span>

                commented just now
              </div>

              <span className={classes.body}>
                <span className={classes.simulateLink}>You can view this branch on Conjure</span>
              </span>
            </span>
          </span>
        </div>

        <ul className={classes.rightSide}>
          <li>
            <span className={classes.title}>Reviewers</span>
            <ul className={classes.teammates}>
              <li>
                <span className={classes.author} />
                <span className={classes.handle}>dan</span>
              </li>
              <li>
                <span className={classes.author} />
                <span className={classes.handle}>ray</span>
              </li>
              <li>
                <span className={classes.author} />
                <span className={classes.handle}>casey</span>
              </li>
              <li>
                <span className={classes.author} />
                <span className={classes.handle}>jamie</span>
              </li>
            </ul>
          </li>
          <li>
            <span className={classes.title}>Assignees</span>
            <ul className={classes.teammates}>
              <li>
                <span className={classes.author} />
                <span className={classes.handle}>mandel</span>
              </li>
            </ul>
          </li>
        </ul>

        {styles}
      </div>
    )
  }
}
