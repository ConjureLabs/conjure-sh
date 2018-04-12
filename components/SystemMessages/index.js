import { Component } from 'react'
import Portal from '../Portal'
import styles, { classes } from './styles'
import messageStyles, { classes as messageClasses } from './styles.message'

const Message = ({ children }) => (
  <article className={messageClasses.root}>
    <span>{children}</span>
    {messageStyles}
  </article>
)

export default class SystemMessages extends Component {
  render() {
    return (
      <Portal>
        <div className={classes.root}>
          <Message>asdf</Message>
          <Message>asdf</Message>
          <Message>asdf</Message>
          {styles}
        </div>
      </Portal>
    )
  }
}
