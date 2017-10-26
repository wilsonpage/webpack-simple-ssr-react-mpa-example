
/**
 * External Dependencies
 */

const express = require('express')

/**
 * Locals
 */

const BUILD_DIR = `${__dirname}/.build`
const publicPath = '/static'
const app = express()

const views = require('./views')({
  buildDir: BUILD_DIR,
  publicPath,
})

// mount the static file server to serve webpack assets
app.use(publicPath, express.static(`${ BUILD_DIR }`))

require('./routes')(app, views)

// // mount each of the pages as a route
// Object.keys(pages).forEach((key) => {
//   const page = pages[key]
//   app.get(page.mountPath, async (req, res) => {
//     res.send(page.render(await page.fetchProps(req)))
//   })
// })

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });

app.listen(3000)
