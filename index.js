
/**
 * External Dependencies
 */

const express = require('express')
const glob = require('glob')

/**
 * Internal Dependencies
 */

const mountPages = require('./lib/mount-pages')

/**
 * Locals
 */

const BUILD_DIR = `${__dirname}/.build`
const publicPath = '/static'
const app = express()

// mount the static file server to serve webpack assets
app.use(publicPath, express.static(`${ BUILD_DIR }`))

mountPages({
  app,
  pages: glob.sync('pages/**/app'),
  buildDir: BUILD_DIR,
  publicPath,
})

app.listen(3000)
