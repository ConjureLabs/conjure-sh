import TextInput from '../Text';

const nonDigitExpr = /\D/g;

export default class NumberInput extends TextInput {
  onChange() {
    super.onChange(...arguments);

    this.input.value = this.input.value.replace(nonDigitExpr, '');
  }
}
