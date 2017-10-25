import { h, Component } from 'preact'

export default class Document extends Component {
  render({ children, head, assets: { scripts, styles }, props = {} }) {
    return (
      <html>
        <head>
          { head }
          { styles.inline && <style dangerouslySetInnerHTML={{ __html: styles.inline }} /> }
          <link rel="preload" as="style" href={ styles.external } onload="this.rel='stylesheet'" />
          { scripts.map((src) => <script defer src={ src } />) }
          <script dangerouslySetInnerHTML={{ __html: `window.__props=${ JSON.stringify(props) }` }} />
        </head>
        <body>
          <div id="main">
            { children }
          </div>
        </body>
      </html>
    )
  }
}
