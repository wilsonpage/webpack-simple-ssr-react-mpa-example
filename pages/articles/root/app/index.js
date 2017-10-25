
import { h, Component } from 'preact'
import styles from './styles.css'

export default class AppContact extends Component {
  static head() {
    return [
      <title>Articles</title>,
    ]
  }

  render() {
    return (
      <div>
        <h1 class={ styles.articles }>Articles</h1>
        <ul>
          <a href="/articles/one">Article One</a>
          <a href="/articles/two">Article Two</a>
        </ul>
      </div>
    )
  }
}
