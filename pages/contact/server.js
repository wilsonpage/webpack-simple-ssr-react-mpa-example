
/**
 * External Dependencies
 */

import toString from 'preact-render-to-string';
import { h } from 'preact';

/**
 * Internal Dependencies
 */

import App from './app';
export default (props) => toString(<App { ...props } />);
