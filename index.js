
/**
 * External Dependencies
 */

const express = require('express')
const path = require('path')

/**
 * Internal Dependencies
 */

const renderer = require('./lib/page-renderer')

/**
 * Locals
 */

const BUILD_DIR = `${__dirname}/.build`
const publicPath = '/static'
const app = express()

const pages = renderer({
  pagesDir: path.join(__dirname, 'pages'),
  buildDir: BUILD_DIR,
  publicPath,
})

// mount the static file server to serve webpack assets
app.use(publicPath, express.static(`${ BUILD_DIR }`))

// mount each of the pages as a route
Object.keys(pages).forEach((key) => {
  const page = pages[key]
  app.get(page.mountPath, async (req, res) => {
    res.send(page.render(await page.fetchProps(req)))
  })
})

app.get('*', (req, res, next) => {
  const error = new Error(`page not found`)
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => { // eslint-disable-line
  const {
    status = 500,
    message,
  } = err

  res.status(status).send(pages.error.render({
    status,
    message,
  }))
})

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });

app.listen(3000)
