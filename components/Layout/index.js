import Head from 'next/head';
import Federal, { connect } from 'federal';
import classnames from 'classnames';

import Header from '../Header';
import config from '../../shared/config';
import nativeStyles from './styles.native.js';

import styles, { classes } from './styles.js';

export default ({ url, children, title = 'Conjure', className, wrappedHeader = true, limitedHeader = false, withHeader = true, withWrapper = true, withFooter = true }) => {
  const { account, cards } = url.query;

  const initialStore = {
    account,
    cards,
    org: null,
    pagingHref: null,
    timeline: null,
    timelineDelta: null
  };

  console.log(initialStore);

  return (
    <div className={classes.root}>
      <Head>
        { process.env.NODE_ENV === 'production' ? <script async src='https://www.googletagmanager.com/gtag/js?id=UA-108457027-1' /> : null }
        { process.env.NODE_ENV === 'production' ? <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-108457027-1');` }} />  : null }
        <title>{title}</title>
        <meta name='description' content='Containers for your Pull Requests, giving you a link to view changes directly in GitHub' />
        <meta name='og:description' content={config.app.web.url} />
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
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

          <div className={classes.content}>
            {withWrapper !== true ? children : (
              <main className={classes.wrap}>
                {children}
              </main>
            )}
          </div>

          {withFooter !== true ? null : (
            <footer className={classes.footer}>
              <span>Copyright &copy; 2017 Conjure Labs, Inc.</span>
              <del>|</del>
              <a href='/privacy'>Privacy</a>
              <del>|</del>
              <a href='/terms'>Terms</a>
            </footer>
          )}
        </div>
      </Federal>

      {styles}
    </div>
  );
};
