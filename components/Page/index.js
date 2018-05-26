import { Component } from 'react'

import Layout from 'components/Layout'

export default class Page extends Component {
  // pass all inbound query args to the component props
  static async getInitialProps({ query }) {
    return query
  }

  constructor(props) {
    super(props)

    // making it easier to use <Layout />
    this.Layout = ({ children, ...layoutProps }) => {
      const { account, cards, messages, containerStarting, meta } = this.props

      return (
        <Layout
          account={account}
          cards={cards}
          messages={messages}
          containerStarting={containerStarting}
          gdprCookies={meta && meta.gdprCookies}
          {...layoutProps}
        >
          {children}
        </Layout>
      )
    }
  }
}
