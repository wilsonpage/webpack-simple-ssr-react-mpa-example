
const { readFileSync } = require('fs')

const glob = require('glob')

module.exports = ({ buildDir, publicPath }) => {
  const render = require(`${ buildDir }/render.js`)
  const chunks = require(`${ buildDir }/manifest.json`)
  const pages = glob.sync(`**/app.js`)

  return pages.reduce((result, path) => {
    const dir = path.replace('/app.js', '')
    const name = dir.replace('views/', '')
    const bundleFilepath = chunks[`${ dir }/client.js`]
    const stylesFilepath = chunks[`${ dir }/client.css`]

    // not all pages have critical css
    const stylesCriticalFilepath = glob.sync(`${ buildDir }/${ dir }/*critical.css`)[0]
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
