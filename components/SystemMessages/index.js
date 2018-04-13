import { Component } from 'react'
import Portal from '../Portal'
import classnames from 'classnames'
import { connect } from '@conjurelabs/federal'

import styles, { classes } from './styles'
import messageStyles, { classes as messageClasses } from './styles.message'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ttlExpired: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ttlExpired: true
      })
    }, this.props.ttl)
  }

  render() {
    const { ttlExpired } = this.state

    if (ttlExpired === true) {
      return null
    }

    const { children, success = false, error = false } = this.props

    return (
      <article className={classnames({
        [messageClasses.root]: true,
        [messageClasses.success]: success,
        [messageClasses.error]: error
      })}>
        <span>{children}</span>
        {messageStyles}
      </article>
    )
  }
}

class SystemMessages extends Component {
  render() {
    const { messages } = this.props

    return (
      <Portal>
        <div className={classes.root}>
          {messages.map((msg, index) => {
            const { type, message, ttl = 7200 } = msg

            return (
              <Message
                success={type === 'success'}
                error={type === 'error'}
                key={index}
                ttl={ttl}
              >
                {message}
              </Message>
            )
          })}
          {styles}
        </div>
      </Portal>
    )
  }
}

const selector = store => {
  return {
    messages: store.messages
  }
}

export default connect(selector)(SystemMessages)
