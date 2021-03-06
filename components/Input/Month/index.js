import SuggestInput from '../Suggest'

const options = [{
  label: '01 - January',
  value: '1'
}, {
  label: '02 - February',
  value: '2'
}, {
  label: '03 - March',
  value: '3'
}, {
  label: '04 - April',
  value: '4'
}, {
  label: '05 - May',
  value: '5'
}, {
  label: '06 - June',
  value: '6'
}, {
  label: '07 - July',
  value: '7'
}, {
  label: '08 - August',
  value: '8'
}, {
  label: '09 - September',
  value: '9'
}, {
  label: '10 - October',
  value: '10'
}, {
  label: '11 - November',
  value: '11'
}, {
  label: '12 - December',
  value: '12'
}]

export default class MonthSuggest extends SuggestInput {
  constructor(props) {
    super(props)

    this.options = options
    this.defaultSuggestions = options.slice(0, this.suggestionsLimit)
  }
}
