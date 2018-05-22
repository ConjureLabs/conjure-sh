import { shortPosts } from '../../mdx/blog'
import Layout from '../../components/Layout'
import ConfigDocs from '../../mdx/docs/config.md'

import DocContent from './components/DocContent'

import styles, { classes } from './styles.js'

export default ({ url }) => (
  <Layout
    url={url}
    title='Conjure Docs'
    className={classes.root}
    wrappedHeader={false}
  >
    <DocContent>
      <ConfigDocs />
    </DocContent>

    {styles}
  </Layout>
)
