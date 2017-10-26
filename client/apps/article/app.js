
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head() {
    return [
      <title>Articles</title>,
    ]
  }

  render({ title, body }) {
    return (
      <div>
        <h1 class={ styles.articles }>{ title }</h1>
        <p>{ body }</p>
      </div>
    )
  }
}
