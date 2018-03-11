import SuggestInput from '../Suggest'

export default class YearSuggest extends SuggestInput {
  constructor(props) {
    super(props)

    this.options = []

    if (!props.start) {
      throw new Error('Year input expects a start year')
    }
    if (!props.end) {
      throw new Error('Year input expects an end year')
    }

    this.propKeysPruned.push('start')
    this.propKeysPruned.push('end')

    for (let position = parseInt(props.start, 10); position <= parseInt(props.end, 10); position++) {
      this.options.push({
        label: position,
        value: position
      })
    }

    this.defaultSuggestions = this.options.slice(0, this.suggestionsLimit)
  }
}
