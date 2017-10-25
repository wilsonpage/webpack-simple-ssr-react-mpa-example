
import styles from './styles.css'
import Button from 'components/Button'
import { h, Component } from 'preact'

import './critical.css'

export default class AppHome extends Component {
  static head({ assets: { scripts, styles }}) {
    return [
      <title>Home</title>,
      <style dangerouslySetInnerHTML={{ __html: styles.inline }} />,
      <link rel="preload" as="style" href={ styles.external } onload="this.rel='stylesheet'" />,
      scripts.map((src) => <script defer src={ src } />),
    ]
  }

  render({ name }) {
    return (
      <div class={ styles.home }>
        <h1>Home { name }</h1>
        <Button>Click Me</Button>
      </div>
    )
  }
}
