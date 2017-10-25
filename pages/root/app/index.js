
import styles from './styles.css'
import Button from 'lib/components/Button'
import { h, Component } from 'preact'

import './critical.css'

export default class AppHome extends Component {
  static head() {
    return [
      <title>Home</title>,
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
