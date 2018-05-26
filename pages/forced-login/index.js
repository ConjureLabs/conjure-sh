import { Component } from 'react'

import config from 'client.config.js'

export default class ForcedLogin extends Component {
  constructor(props) {
    super(props)
    this.form = null // placehoder for form el ref
  }

  componentDidMount() {
    this.form.submit()
  }

  render() {
    return (
      <form
        action={`${config.app.api.url}/auth/github`}
        method='post'
        ref={form => this.form = form}
      />
    )
  }
}
