
import React from 'react';
import { App } from './components/app';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

const fetchMonkeyPatch = window.fetch;
function newFetch (url, options, ...args) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['x-csrf-token'] = document.body.getAttribute('data-csrf');

    return fetchMonkeyPatch(url, options, ...args);
}

window.fetch = newFetch;

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/pattern/:pattern" component={App}/>
  </Router>
), document.getElementById('app'));

const alert = window.alert;
window.alert = (...args) => {
    setTimeout(() => {
        alert.call(window, ...args);
    }, 500);
}