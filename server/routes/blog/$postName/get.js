const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route()

/*
  Logged-out landing page
 */
route.push(async (req, res, next) => {
  const { DatabaseTable } = require('@conjurelabs/db')
  const blogPosts = new DatabaseTable('blog')
  const post = await blogPosts.select({
    mdxName: req.params.postName
  })

  if (!post) {
    // cause 404
    return next()
  }

  // getting short posts
  await getShortPosts(posts)

  return nextApp.render(req, res, '/blog/post', {
    post
  })
})

module.exports = route
