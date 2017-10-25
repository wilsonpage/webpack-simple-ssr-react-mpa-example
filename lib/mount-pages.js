
const { readFileSync, existsSync } = require('fs')
const path = require('path')
const glob = require('glob')

module.exports = ({ app, pages, buildDir, publicPath }) => {
  const render = require(`${ buildDir }/server-render.js`)
  const chunks = require(`${ buildDir }/manifest.json`)

  pages.forEach((page) => {
    const appDir = page
      .replace(/\/app$/, '')

    const mountPath = appDir
      .replace('pages', '')
      .replace(/root$/, '')

    const bundleFilepath = chunks[`${ appDir }.js`]
    const stylesFilepath = chunks[`${ appDir }.css`]

    // not all pages have critical css
    const stylesCriticalFilepath = glob.sync(`${ buildDir }/${ appDir }/*critical.css`)[0]
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

    const fetchPropsFilepath = path.resolve(appDir, 'fetch-props.js')
    const fetchProps = existsSync(fetchPropsFilepath)
      ? require(fetchPropsFilepath)
      : () => {}

    app.get(mountPath, async (req, res) => {
      res.send(render(page, assets, await fetchProps(req)))
    })
  })
}
