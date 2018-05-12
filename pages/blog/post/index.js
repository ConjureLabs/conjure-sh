import title from 'title'

import fullPosts from '../../../mdx/blog'
import Layout from '../../../components/Layout'
import FormattedDate from '../../../components/FormattedDate'

import Authors from '../components/Authors'
import PostContent from '../components/PostContent'

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
        <FormattedDate className={classes.date}>{post.added}</FormattedDate>
        <a
          className={classes.back}
          href='/blog'
        >
          ‹ Blog
        </a>
        <Authors authors={post.authors} />
        <PostContent>
          <FullPost />
        </PostContent>
      </article>

      {styles}
    </Layout>
  )
}
