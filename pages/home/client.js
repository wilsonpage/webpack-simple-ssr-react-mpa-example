import { h, render } from 'preact';
import App from './app';

const container = document.getElementById('main');
const props = window.__props;

render(<App { ...props }/>, container, container.lastElementChild);
