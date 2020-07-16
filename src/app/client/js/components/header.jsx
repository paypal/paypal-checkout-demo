import React from 'react';

import { Toggle } from './toggle';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>
          <img
            src="https://developer.paypal.com/components/dx/img/logo-PayPal-Developer.svg"
            alt="PayPal"
          />
          <span>Smart Payment Buttons Integration</span>
        </h1>

        {/* <Toggle left="sandbox" right="production" default="left" onChange={this.props.onChangeEnv} /> */}
      </header>
    );
  }
}
