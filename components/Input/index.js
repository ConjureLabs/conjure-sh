import { Component } from 'react'
import classnames from 'classnames'

import styles, { classes } from './styles.js'

let uid = 1

export default class Input extends Component {
  constructor(props) {
    super(props)

    const { value } = props

    this.state = {
      initialPlaceholder: value == undefined ? true :
        typeof value === 'string' ? !value.trim() :
        false,
      isFocused: false
    }

    this.forcedInputProps = {
      // can be filled in by child components
    }

    // can be filled in, by child component, to prune prop keys before rendering
    this.propKeysPruned = []

    // can be used by components like Checkbox to append classes to root
    // these attributes need to be added to the styles of this root component
    this.extraClasses = {}

    // used for label "for"
    this.uid = uid++

    // this.type should be set for any child component
  }

  // can be overridden to force a different type of element
  get tagName() {
    return 'input'
  }

  get value() {
    return this.input.value
  }

  get checked() {
    return this.input.checked
  }

  onKeyDown() {
    const { onKeyDown } = this.props

    if (typeof onKeyDown === 'function') {
      onKeyDown(...arguments)
    }
  }

  onKeyUp() {
    const { onKeyUp } = this.props

    if (typeof onKeyUp === 'function') {
      onKeyUp(...arguments)
    }
  }

  onChange() {
    const { onChange } = this.props
    const { value } = this.input
    const { initialPlaceholder, isFocused } = this.state

    if (typeof onChange === 'function') {
      onChange(...arguments)
    }

    if (value === '' && initialPlaceholder === false && isFocused === false) {
      this.setState({
        initialPlaceholder: true
      })
    } else if (value !== '' && initialPlaceholder === true) {
      this.setState({
        initialPlaceholder: false
      })
    }
  }

  onFocus() {
    const { onFocus } = this.props

    if (typeof onFocus === 'function') {
      onFocus(...arguments)
    }

    if (this.state.isFocused === false) {
      this.setState({
        isFocused: true
      })
    }
  }

  onBlur() {
    const { onBlur } = this.props
    const { value } = this.input
    const { isFocused, initialPlaceholder } = this.state

    if (typeof onBlur === 'function') {
      onBlur(...arguments)
    }

    const stateChanges = {}

    if (isFocused === true) {
      stateChanges.isFocused = false
    }
    if (value === '' && initialPlaceholder === false) {
      stateChanges.initialPlaceholder = true
    }

    this.setState(stateChanges)
  }

  // replace (in child component) with custom jsx to be rendered _before_ the <input>
  beforeInput() {
    return null
  }

  // replace (in child component) with custom jsx to be rendered _after_ the <input>
  afterInput() {
    return null
  }

  render() {
    const { label, value, checked, id, type, ...extraCustomProps } = this.props
    const inputProps = {
      ...extraCustomProps,
      ...this.forcedInputProps,
      id: id || `input_${this.uid}`,
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onChange: this.onChange.bind(this),
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur.bind(this),
      defaultValue: value,
      defaultChecked: checked,
      type: this.type ? this.type : type
    }
    const stateLabel = this.state.label // children can override label shown

    const labelShown = stateLabel || label
    const carriedClassName = inputProps.className

    // this is carried over to the span, but not the <input>
    // we will force a custom classname for the root
    inputProps.className = classes.input

    // see https://stackoverflow.com/questions/15738259/disabling-chrome-autofill
    // chrome is a pain sometimes
    inputProps.autoComplete = inputProps.autoComplete === false ? `prevent_autocomplete_${this.uid}` : null
    const { isFocused, initialPlaceholder } = this.state

    for (let i = 0; i < this.propKeysPruned.length; i++) {
      delete inputProps[ this.propKeysPruned[i] ]
    }

    const InputTag = this.tagName

    const extraClasses = Object.keys(this.extraClasses || {}).reduce((extraClasses, key) => {
      extraClasses[ classes[key] ] = this.extraClasses[key]
      return extraClasses
    }, {})

    return (
      <span className={classnames(extraClasses, {
        [classes.initialPlaceholder]: !isFocused && initialPlaceholder
      }, carriedClassName)}>
        {labelShown ? (
          <label
            htmlFor={inputProps.id}
          >
            {labelShown}
          </label>
        ) : null}

        {this.beforeInput()}

        <InputTag
          {...inputProps}
          ref={input => this.input = input}
        />

        {this.afterInput()}

        {styles}
      </span>
    )
  }
}
