
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head({ assets: { scripts, styles }}) {
    return [
      <title>Contact</title>,
      <link rel="preload" as="style" href={ styles.external } onload="this.rel='stylesheet'" />,
      scripts.map((src) => <script defer src={ src } />),
    ]
  }

  render() {
    return <h1 class={ styles.about }>About</h1>
  }
}
