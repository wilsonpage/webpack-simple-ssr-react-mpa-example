
/**
 * External Dependencies
 */

const express = require('express')

/**
 * Locals
 */

const publicPath = '/static'

module.exports = (client) => {
  const app = express()
  const render = client.renderer({ publicPath })

  // serve the client's build assets
  app.use(publicPath, express.static(client.buildDir))

  // mount the routes passing the client renderer
  require('./routes')({ app, render })

  app.listen(3000)
}
