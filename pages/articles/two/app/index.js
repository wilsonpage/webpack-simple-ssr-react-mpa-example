
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head() {
    return [
      <title>Article Two</title>,
    ]
  }

  render() {
    return <h1 class={ styles.contact }>Article Two</h1>
  }
}
