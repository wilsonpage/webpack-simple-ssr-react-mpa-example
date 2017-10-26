
/**
 * External Dependencies
 */

import toString from 'preact-render-to-string'
import { h } from 'preact'

/**
 * Internal Dependencies
 */

import Document from 'lib/components/Document'

// require.context is a magic webpack require that will import
// all modules within the given dir maching the given regex
// https://webpack.js.org/guides/dependency-management/#require-with-expression
const requirePage = require.context('.', true, /app\.js$/)

module.exports = (key, assets, props = {}) => {
  const requireKey = `./${ key }`
  const App = requirePage(requireKey).default
  const head = App.head && App.head(props)

  return toString(
    <Document assets={ assets } head={ head } props={ props }>
      <App { ...props } />
    </Document>
  )
}
