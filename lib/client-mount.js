
/**
 * External Dependencies
 */

import { h, render } from 'preact'

export default (App) => {
  const container = document.getElementById('main')
  const props = window.__props

  render(<App { ...props }/>, container, container.lastElementChild)
}
