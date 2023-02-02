import React from 'react';
import { App } from './components/app';
import { render } from 'react-dom';
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

const fetchMonkeyPatch = window.fetch;
function newFetch(url, options, ...args) {
  options = options || {};
  options.headers = options.headers || {};
  options.headers['x-xsrf-token'] = document.body.getAttribute('data-csrf');

  return fetchMonkeyPatch(url, options, ...args);
}

window.fetch = newFetch;

render(
  <HashRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/pattern/server" />
      </Route>
      <Route path="/pattern/:pattern" component={App} />
      <Route path="*">
        <Redirect to="/pattern/server" />
      </Route>
    </Switch>
  </HashRouter>,
  document.getElementById('app')
);

const alert = window.alert;
window.alert = (...args) => {
  setTimeout(() => {
    alert.call(window, ...args);
  }, 500);
};
