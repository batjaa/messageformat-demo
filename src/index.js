import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const ReactApp = ReactDOM.render(
    <App />,
  document.getElementById('root')
);

window.ReactApp = ReactApp;