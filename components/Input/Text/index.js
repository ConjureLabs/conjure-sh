import Input from '../index.js'

export default class TextInput extends Input {
  constructor(props) {
    super(props)

    this.type = 'text'
  }
}
