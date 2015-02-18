/** @jsx React.DOM */

'use strict';

var React = require('react');
window.React = React;

var MyComponent = require('./components/root.jsx');

React.renderComponent(<MyComponent />, document.body);
