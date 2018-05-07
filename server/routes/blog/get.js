const Route = require('@conjurelabs/route')

const nextApp = require('../../next')

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

  return nextApp.render(req, res, '/blog', {
    posts
  })
})

module.exports = route
