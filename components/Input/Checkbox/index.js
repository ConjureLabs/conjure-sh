import Input from '../index.js'

export default class CheckboxInput extends Input {
  constructor(props) {
    super(props)
    this.type = 'checkbox'
    this.extraClasses.toggle = true
  }
}
