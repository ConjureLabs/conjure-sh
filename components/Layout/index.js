import { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Federal from '@conjurelabs/federal'
import classnames from 'classnames'

import Header from './components/Header'
import Footer from './components/Footer'
import SystemMessages from 'components/SystemMessages'
import config from 'client.config.js'

import styles, { classes } from './styles.js'
import nativeStyles from './styles.native.js'

export default class Layout extends Component {
  static async getInitialProps({ req }) {
    const { account, cards, messages, containerStarting, meta } = req

    return {
      account,
      cards,
      messages,
      containerStarting,
      gdpr: meta.gdpr
    }
  }

  static propType = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    wrappedHeader: PropTypes.bool.isRequired,
    limitedHeader: PropTypes.bool.isRequired,
    withHeader: PropTypes.bool.isRequired,
    withWrapper: PropTypes.bool.isRequired,
    withFooter: PropTypes.bool.isRequired,
    contentPadded: PropTypes.bool.isRequired
  }

  static defaultProps = {
    title: 'Conjure',
    wrappedHeader: true,
    limitedHeader: false,
    withHeader: true,
    withWrapper: true,
    withFooter: true,
    contentPadded: true
  }

  render() {
    const {
      account, cards, messages, containerStarting, gdpr,
      children, title, className, wrappedHeader, limitedHeader,
      withHeader, withWrapper, withFooter, contentPadded
    } = this.props

    const initialStore = {
      account,
      cards,
      messages: messages || [],
      pagingHref: null,
      timeline: null,
      timelineDelta: null,
      containerStarting
    }

    return (
      <div className={classes.root}>
        <Head>
          { process.env.NODE_ENV === 'production' ? <script async src='https://www.googletagmanager.com/gtag/js?id=UA-108457027-1' /> : null }
          { process.env.NODE_ENV === 'production' ? <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-108457027-1');` }} />  : null }
          <title>{title}</title>
          <meta name='description' content='Ephemeral Staging Deployments for your GitHub Pull Requests' />
          <meta name='og:description' content={config.app.web.url} />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width' />
          <meta name='theme-color' content='#ffffff' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/images/favicon/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/images/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/images/favicon/favicon-16x16.png' />
          <link rel='manifest' href='/static/images/favicon/manifest.json' />
          <link rel='mask-icon' href='/static/images/favicon/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='manifest' href='/static/images/favicon/manifest.json' />
          {nativeStyles}
        </Head>

        {gdpr !== true ? null : (
          <div className='gdpr'>Cookies help us deliver our Services. By using our Services or clicking I agree, you agree to our use of cookies.</div>
        )}

        <Federal store={initialStore}>
          <div className={classnames(classes.page, className)}>
            {withHeader !== true ? null : (<Header limited={limitedHeader} wrapped={wrappedHeader} />)}

            <div className={classnames({
              [classes.content]: true,
              [classes.padded]: !!contentPadded
            })}>
              {withWrapper !== true ? children : (
                <main className={classes.wrap}>
                  {children}
                </main>
              )}
            </div>

            {withFooter !== true ? null : (
              <Footer />
            )}
          </div>

          <SystemMessages />
        </Federal>

        {styles}
      </div>
    )
  }
}
