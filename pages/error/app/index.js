
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head({ status }) {
    return [
      <title>Error { status }</title>,
    ]
  }

  render({ status }) {
    return <h1 class={ styles.error }>Error { status }</h1>
  }
}
