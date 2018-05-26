import { shortPosts } from 'mdx/blog'
import ConfigDocs from 'mdx/docs/config.md'
import Page from 'components/Page'

import DocContent from './components/DocContent'

import styles, { classes } from './styles.js'

export default class Docs extends Page {
  render() {
    return (
      <this.Layout
        title='Conjure Docs'
        className={classes.root}
        wrappedHeader={false}
      >
        <DocContent>
          <ConfigDocs />
        </DocContent>

        {styles}
      </this.Layout>
    )
  }
}
