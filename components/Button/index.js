import styles from './styles.css';
import { h, Component } from 'preact';

export default class Button extends Component {
  render({ children }) {
    return <button className={ styles.button }>{ children }</button>;
  }
}
