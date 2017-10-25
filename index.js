const BUILD_DIR = `${__dirname}/.build`

const render = require(`${ BUILD_DIR }/render.js`)
const chunks = require(`${ BUILD_DIR }/manifest.json`)
const express = require('express')
const app = express()

const publicPath = '/static'
const renderParams = {
  buildDir: BUILD_DIR,
  render,
  chunks,
  publicPath,
}

app.use(publicPath, express.static(`${ BUILD_DIR }`))
app.get('/', require('./pages/home/server')(renderParams))
app.get('/about', require('./pages/about/server')(renderParams))
app.get('/contact', require('./pages/contact/server')(renderParams))
app.listen(3000)
