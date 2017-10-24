
import { h, Component } from 'preact';
import Button from '../../../components/Button';

import styles from './styles.css?critical';
// import '../../../components/Button/styles.css?critical';

export default class AppAbout extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <Button>Click me</Button>
      </div>
    );
  }
}
