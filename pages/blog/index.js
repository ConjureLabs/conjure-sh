import { shortPosts } from '../../mdx/blog'
import Layout from '../../components/Layout'
import FormattedDate from '../../components/FormattedDate'

import Authors from './components/Authors'
import PostContent from './components/PostContent'

import styles, { classes } from './styles.js'

export default ({ url }) => (
  <Layout
    url={url}
    title='Blog'
    className={classes.root}
    wrappedHeader={false}
  >
    {url.query.posts.map(post => {
      const ShortPost = shortPosts[post.mdxName]

      return (
        <article
          className={classes.post}
          key={post.mdxName}
        >
          <span className={classes.date}>
            <FormattedDate>{post.added}</FormattedDate>
            <Authors authors={post.authors} />
            <PostContent>
              <ShortPost />
            </PostContent>
            <a
              className={classes.readMore}
              href={`/blog/${post.mdxName}`}
            >
              Read More
            </a>
          </span>
        </article>
      )
    })}
    {styles}
  </Layout>
)
