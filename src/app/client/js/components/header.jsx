
import React from 'react';

import { Toggle } from './toggle';

export let Header = React.createClass({
    render() {
        return (
            <header>
                <h1>
                    <img src="https://developer.paypal.com/components/dx/img/logo-PayPal-Developer.svg" alt="PayPal" />
                    <span>Checkout Integration Patterns</span>
                </h1>

                <Toggle left="sandbox" right="production" default="left" onChange={this.props.onChangeEnv} />
            </header>
        );
    }
});
