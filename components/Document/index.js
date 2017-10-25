import styles from './styles.css';
import { h, Component } from 'preact';

export default class Document extends Component {
  render({ children, head, props = {} }) {
    return (
      <html>
        <head>
          { head }
          <script dangerouslySetInnerHTML={{ __html: `window.__props=${ JSON.stringify(props) }` }} />
        </head>
        <body>
          <div id="main">
            { children }
          </div>
        </body>
      </html>
    );
  }
}
