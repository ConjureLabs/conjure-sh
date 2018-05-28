import { Component } from 'react'

import Portal from '../Portal'
import TextInput from '../Input/Text'
import Button from '../Button'

import styles, { classes } from './styles.js'

export default class DangerZoneConfirm extends Component {
  constructor(props) {
    super(props)

    this.input = null // ref set at render
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
    const { subjectLabel, onConfirm, onCancel } = this.props
    const { enabled } = this.state

    return (
      <Portal>
        <div className={classes.container}>
          <div className={classes.modal}>
            <header>Danger Zone</header>
            <div className={classes.content}>
              <p>Enter the <span className={classes.emphasis}>{subjectLabel}</span> to confirm</p>
              
              <div className={classes.input}>
                <TextInput
                  label={subjectLabel}
                  onKeyUp={this.onKeyUp.bind(this)}
                  ref={ref => this.input = ref}
                />
              </div>

              <div className={classes.actions}>
                <Button
                  size='small'
                  color='red'
                  disabled={!enabled}
                  onClick={() => {
                    onConfirm()
                  }}
                >
                  Confirm
                </Button>

                <Button
                  size='small'
                  color='gray'
                  hallow={true}
                  onClick={() => {
                    onCancel()
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.veil} />
        </div>
        {styles}
      </Portal>
    )
  }
}
