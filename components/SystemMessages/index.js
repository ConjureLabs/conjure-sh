import { Component } from 'react'
import Portal from '../Portal'
import classnames from 'classnames'
import styles, { classes } from './styles'
import messageStyles, { classes as messageClasses } from './styles.message'

const Message = ({ children, success = false, error = false }) => (
  <article className={classnames({
    [messageClasses.root]: true,
    [messageClasses.success]: success,
    [messageClasses.error]: error
  })}>
    <span>{children}</span>
    {messageStyles}
  </article>
)

export default class SystemMessages extends Component {
  render() {
    return (
      <Portal>
        <div className={classes.root}>
          <Message success>You totally did everything you need to do, so just sit back, relax, and enjoy the show! Rock on! CONJURE CONJURE CONJURE!!!</Message>
          <Message error>asdf</Message>
          <Message>asdf</Message>
          {styles}
        </div>
      </Portal>
    )
  }
}
