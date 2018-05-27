import { Component } from 'react'

import Portal from '../Portal'
import TextInput from '../Input/Text'
import Button from '../Button'

import styles, { classes } from './styles.js'

export default class DangerZoneConfirm extends Component {
  constructor(props) {
    super(props)

    this.input // ref set at render
    this.state = {
      enabled: false
    }
  }

  onKeyUp() {
    const { expectedEntry } = this.props
    const { value } = this.input
    let enabled = false

    if (expectedEntry.toLowerCase().trim() === value.toLowerCase().trim()) {
      enabled = true
    }

    this.setState({
      enabled
    })
  }

  render() {
    const { subjectLabel } = this.props

    return (
      <Portal>
        <div className={classes.container}>
          <div className={classes.modal}>
            <header>Danger Zone</header>
            <p>Please enter the {subjectLabel} to confirm</p>
            <TextInput
              label={subjectLabel}
              onKeyUp={this.onKeyUp.bind(this)}
              ref={ref => this.input = ref}
            />
            <Button
              size='medium'
              color='red'
            >
              Confirm
            </Button>
          </div>
          <div className={classes.veil} />
        </div>
        {styles}
      </Portal>
    )
  }
)
