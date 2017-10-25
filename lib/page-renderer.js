
const { readFileSync, existsSync } = require('fs')
const path = require('path')
const glob = require('glob')

module.exports = ({ pagesDir, buildDir, publicPath }) => {
  const render = require(`${ buildDir }/server-render.js`)
  const chunks = require(`${ buildDir }/manifest.json`)
  const pages = glob.sync(`${ pagesDir }/**/app`)

  return pages.reduce((result, absolutePath) => {
    const dir = absolutePath
      .replace(`${ pagesDir }`, 'pages')
      .replace(/\/app$/, '')

    const pagePath = dir.replace('pages/', '')
    const mountPath = `/${ pagePath.replace(/\/?root$/, '') }`
    const appPath = `${ dir }/app`

    const bundleFilepath = chunks[`${ dir }.js`]
    const stylesFilepath = chunks[`${ dir }.css`]

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

    const fetchPropsFilepath = path.resolve(dir, 'fetch-props.js')
    const fetchProps = existsSync(fetchPropsFilepath)
      ? require(fetchPropsFilepath)
      : () => {}

    const page = {
      render: (props) => render(appPath, assets, props),
      fetchProps,
      mountPath,
      pagePath,
    }

    result[pagePath] = page
    return result
  }, {})
}
