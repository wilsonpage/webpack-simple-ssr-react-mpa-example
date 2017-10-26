import styles from './styles.css';
import { h, Component } from 'preact';

export default class Button extends Component {
  render({ children, onClick }) {
    return <button onClick={ onClick } className={ styles.button }>{ children }</button>;
  }
}
