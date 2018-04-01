import TextInput from '../Text'

const nonDigitExpr = /\D/g

export default class NumberInput extends TextInput {
  constructor(props) {
    super(props)

    this.forcedInputProps.autocomplete = 'off'
  }

  onChange() {
    this.input.value = this.input.value.replace(nonDigitExpr, '')
    super.onChange(...arguments)
  }
}
