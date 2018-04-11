import { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
  }

  render() {
    const { mounted } = this.state

    if (!mounted) {
      return null
    }

    const { children } = this.props
    return ReactDOM.createPortal(children, document.body)
  }
}
