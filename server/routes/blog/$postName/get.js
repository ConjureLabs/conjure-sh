const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route()

/*
  Logged-out landing page
 */
route.push(async (req, res, next) => {
  const { DatabaseTable } = require('@conjurelabs/db')
  const blogPosts = new DatabaseTable('blog')
  const posts = await blogPosts.select({
    mdxName: req.params.postName
  })

  if (!posts.length) {
    // cause 404
    return next()
  }

  return nextApp.render(req, res, '/blog/post', {
    post: posts[0]
  })
})

module.exports = route
