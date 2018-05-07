import title from 'title'

import fullPosts from '../../../mdx/blog'
import Layout from '../../../components/Layout'
import FormattedDate from '../../../components/FormattedDate'

import styles, { classes } from './styles.js'

export default ({ url }) => {
  const { post } = url.query
  const FullPost = fullPosts[post.mdxName]

  return (
    <Layout
      url={url}
      title={title(post.mdxName.replace(/-/g, ' '))}
      className={classes.root}
      wrappedHeader={false}
    >
      <article className={classes.post}>
        <span className={classes.date}>
          <FormattedDate>{post.added}</FormattedDate>
          <div className={classes.content}>
            <FullPost />
          </div>
        </span>
      </article>

      {styles}
    </Layout>
  )
}
