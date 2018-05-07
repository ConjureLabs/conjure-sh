const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route()

/*
  Logged-out landing page
 */
route.push(async (req, res, next) => {
  const { DatabaseTable, query } = require('@conjurelabs/db')
  const posts = await DatabaseTable.select('blog', {
    mdxName: req.params.postName
  })

  if (!posts.length) {
    // cause 404
    return next()
  }

  const post = posts[0]

  const inArgs = post.authors.map((_, index) => `$${index + 1}`).join(', ')

  const authorsResults = await query(`
    SELECT *
    FROM conjure_team
    WHERE ID IN (${inArgs})
  `, [...post.authors])

  post.authors = authorsResults.rows // hydrating

  return nextApp.render(req, res, '/blog/post', {
    post
  })
})

module.exports = route
