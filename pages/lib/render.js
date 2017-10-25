
import Document from 'components/Document'
import Contact from '../contact/app'
import About from '../about/app'
import Home from '../home/app'

import toString from 'preact-render-to-string'
import { h } from 'preact'

const pages = {
  contact: Contact,
  about: About,
  home: Home,
}

module.exports = (key, props) => {
  const App = pages[key]

  return toString(
    <Document { ...props } head={ App.head(props) }>
      <App { ...props.props } />
    </Document>
  )
}
