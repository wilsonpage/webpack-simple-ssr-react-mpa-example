
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head() {
    return [
      <title>Contact</title>,
    ]
  }

  render() {
    return <h1 class={ styles.about }>About</h1>
  }
}
