
const { readFileSync } = require('fs')
const path = require('path')
const glob = require('glob')

const BUILD_DIR = exports.buildDir = path.join(__dirname, '.build')

exports.renderer = ({ publicPath }) => {
  const render = require(`${ BUILD_DIR }/render.js`)
  const chunks = require(`${ BUILD_DIR }/manifest.json`)
  const pages = glob.sync(`${ __dirname }/apps/*/app.js`)

  return pages.reduce((result, path) => {
    path = path.replace(`${ __dirname }/`, '')
    const dir = path.replace('/app.js', '')
    const name = dir.replace('apps/', '')
    const bundleFilepath = chunks[`${ dir }.js`]
    const stylesFilepath = chunks[`${ dir }.css`]

    // not all pages have critical css
    const stylesCriticalFilepath = glob.sync(`${ BUILD_DIR }/${ dir }/*critical.css`)[0]
    const stylesCritical = stylesCriticalFilepath && readFileSync(stylesCriticalFilepath)

    const assets = {
      scripts: [
        `${ publicPath }/${ chunks['commons.js'] }`,
        `${ publicPath }/${ bundleFilepath }`,
      ],
      styles: {
        inline: stylesCritical,
        external: `${ publicPath }/${ stylesFilepath }`,
      },
    }

    result[name] = (props) => render(path, assets, props)
    return result
  }, {})
}
