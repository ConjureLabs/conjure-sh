import dynamic from 'next/dynamic'

import Layout from '../../components/Layout'
import FormattedDate from '../../components/FormattedDate'

import styles, { classes } from './styles.js'

export default ({ url }) => (
  <Layout
    url={url}
    title='Blog'
    className={classes.root}
    wrappedHeader={false}
  >
    {url.query.posts.map(post => {
      const ShortPost = dynamic(import(`../../mdx/blog/${post.mdxName}.short.md`))

      return (
        <article
          className={classes.post}
          key={post.mdxName}
        >
          <span className={classes.date}>
            <FormattedDate>{post.added}</FormattedDate>
            <div className={classes.content}>
              <ShortPost />
            </div>
          </span>
        </article>
      )
    })}
    {styles}
  </Layout>
)
