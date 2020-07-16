import React, { Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { ZalgoPromise } from 'zalgo-promise';

function runScripts(el) {
  let promise = ZalgoPromise.resolve();

  Array.prototype.slice
    .call(el.querySelectorAll('script'))
    .forEach((script) => {
      promise = promise.then(() => {
        return new ZalgoPromise((resolve, reject) => {
          let parentNode = script.parentNode;

          if (!parentNode) {
            return;
          }

          let newScript = document.createElement('script');

          newScript.onload = resolve;
          newScript.onerror = reject;

          parentNode.replaceChild(newScript, script);

          if (script.textContent) {
            newScript.text = script.textContent;
            resolve();
          } else if (script.src) {
            newScript.src = script.src;
          }
        });
      });
    });

  return promise;
}

export class Code extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
    };
  }

  runScripts(el, code) {
    if (!el || !code || el.code === code) {
      return;
    }

    el.code = code;
    el.innerHTML = code;

    if (this.props.setup) {
      this.props.setup();
    }

    this.setState({ loading: true });
    return runScripts(el).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (!this.props.code) {
      return null;
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div
          className="spinner"
          style={{ display: this.state.loading ? 'inline-block' : 'none' }}
        ></div>
        <div
          id="code"
          ref={(el) => this.runScripts(el, this.props.code)}
          style={{ display: this.state.loading ? 'none' : 'block' }}
          className={['code', this.props.pattern].join(' ')}
        ></div>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.code !== nextProps.code ||
      this.state.loading !== nextState.loading
    );
  }
}
