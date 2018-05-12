import Head from 'next/head'
import Federal from '@conjurelabs/federal'
import classnames from 'classnames'

import Header from './components/Header'
import Footer from './components/Footer'
import SystemMessages from '../SystemMessages'
import config from '../../client.config.js'

import styles, { classes } from './styles.js'
import nativeStyles from './styles.native.js'

export default ({ url, children, title = 'Conjure', className, wrappedHeader = true, limitedHeader = false, withHeader = true, withWrapper = true, withFooter = true, contentPadded = true }) => {
  const urlQuery = url && typeof url.query === 'object' ? url.query : {}
  const { account, cards, messages, containerStarting } = urlQuery

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
