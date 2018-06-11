import { Component } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Federal from '@conjurelabs/federal'
import classnames from 'classnames'

import Header from './components/Header'
import Footer from './components/Footer'
import Button from 'components/Button'
import SystemMessages from 'components/SystemMessages'
import config from 'client.config.js'
import { post } from 'shared/xhr'

import styles, { classes } from './styles.js'
import nativeStyles from './styles.native.js'

export default class Layout extends Component {
  static propType = {
    account: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object),
    messages: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      ttl: PropTypes.number
    })).isRequired,
    containerStarting: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    gdprCookies: PropTypes.bool.isRequired,
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
    gdprCookies: false,
    messages: [],
    title: 'Conjure',
    wrappedHeader: true,
    limitedHeader: false,
    withHeader: true,
    withWrapper: true,
    withFooter: true,
    contentPadded: true
  }

  constructor(props) {
    super(props)

    this.state = {
      showGdprCookiesDialog: props.gdprCookies === true
    }
  }

  render() {
    const {
      account, cards, messages, containerStarting,
      children, title, className, wrappedHeader, limitedHeader,
      withHeader, withWrapper, withFooter, contentPadded
    } = this.props

    const { showGdprCookiesDialog } = this.state

    const initialStore = {
      account,
      cards,
      messages,
      pagingHref: null,
      timeline: null,
      timelineDelta: null,
      containerStarting
    }

    return (
      <div className={classes.root}>
        <Head>
          { process.env.NODE_ENV === 'production' ? <script async src='https://www.googletagmanager.com/gtag/js?id=UA-108457027-1' /> : null }
          { process.env.NODE_ENV === 'production' ? <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments)} gtag('js', new Date()); gtag('config', 'UA-108457027-1');` }} /> : null }
          { process.env.NODE_ENV === 'production' ? <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '179588329357608'); fbq('track', 'PageView');` }} /> : null }
          { process.env.NODE_ENV === 'production' ? (<noscript><img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=179588329357608&ev=PageView&noscript=1' /></noscript>) : null }
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

        {showGdprCookiesDialog !== true ? null : (
          <div className={classes.gdpr}>
            <p>Cookies help us deliver our Services. By using our Services or clicking I agree, you agree to our use of cookies.</p>
            <Button
              size='small'
              color='black'
              className={classes.button}
              onClick={() => {
                this.setState({
                  showGdprCookiesDialog: false
                }, () => {
                  post(`${config.app.api.url}/api/privacy/cookies/ack`, {}, err => {
                    if (err) {
                      console.error(err)
                      return
                    }
                  })
                })
              }}
            >
              I Agree
            </Button>
          </div>
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
