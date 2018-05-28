const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Logged-out landing page
 */
route.push(async (req, res) => {
  const { query } = require('@conjurelabs/db')
  const blogPostResults = await query(`
    SELECT *
    FROM blog
    ORDER BY added DESC
  `)
  const posts = blogPostResults.rows

  // hydrate authors
  const batchAll = require('@conjurelabs/utils/Promise/batch-all')
  await batchAll(3, posts, async post => {
    return new Promise(async resolve => {
      const inArgs = post.authors.map((_, index) => `$${index + 1}`).join(', ')
      const authorsResults = await query(`
        SELECT *
        FROM conjure_team
        WHERE ID IN (${inArgs})
      `, [...post.authors])

      post.authors = authorsResults.rows

      resolve()
    })
  })

  return res.render('/blog', {
    posts
  })
})

module.exports = route
