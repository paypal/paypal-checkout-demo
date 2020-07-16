import React from 'react';
import { App } from './components/app';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import { HashRouter } from 'react-router-dom';

const fetchMonkeyPatch = window.fetch;
function newFetch(url, options, ...args) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['x-csrf-token'] = document.body.getAttribute('data-csrf');

  return fetchMonkeyPatch(url, options, ...args);
}

window.fetch = newFetch;

render(
  <HashRouter>
    <Route path="/" component={App} />
    <Route path="/pattern/:pattern" component={App} />
  </HashRouter>,
  document.getElementById('app')
);

const alert = window.alert;
window.alert = (...args) => {
  setTimeout(() => {
    alert.call(window, ...args);
  }, 500);
};
