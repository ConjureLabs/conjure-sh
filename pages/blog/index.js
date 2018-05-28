import { shortPosts } from 'mdx/blog'
import FormattedDate from 'components/FormattedDate'
import Page from 'components/Page'

import Authors from './components/Authors'
import PostContent from './components/PostContent'

import styles, { classes } from './styles.js'

export default class Blog extends Page {
  render() {
    const { posts } = this.props

    return (
      <this.Layout
        title='Blog'
        className={classes.root}
        wrappedHeader={false}
      >
        {posts.map(post => {
          const ShortPost = shortPosts[post.mdxName]

          return (
            <article
              className={classes.post}
              key={post.mdxName}
            >
              <FormattedDate className={classes.date}>{post.added}</FormattedDate>
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
            </article>
          )
        })}
        {styles}
      </this.Layout>
    )
  }
}
