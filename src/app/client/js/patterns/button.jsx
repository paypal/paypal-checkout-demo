
import React from 'react';

export let button = {

    slug: 'button',

    name: `Button`,

    fullName: `PayPal Checkout Button`,

    nosidebar: true,

    setup() {

        let render = paypal.Button.render;

        paypal.Button.render = function(options, container) {
            options = options || {};

            options.validate = function(actions) {
                actions.disable();
            };

            return render.call(this, options, container);
        };

        setTimeout(() => {
            paypal.Button.render = render;
        }, 1);
    },

    intro: (
        <p>Create a <b>PayPal Checkout</b> button</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>

            <!-- Add meta header for IE Compatibility -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />

            <!-- Include the checkout.js script -->
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        </head>

        <body>

            <!-- Set up a container element for the button -->

            <div id="paypal-button-container"></div>

            <script>

                // Render the PayPal button into #paypal-button-container

                paypal.Button.render({

                    env: '${ctx.env}', // sandbox | production

                    payment: function(data, actions) {

                        // payment() will be called when a customer clicks on the
                        // PayPal button. We will set up a payment here.
                    },

                    onAuthorize: function(data, actions) {

                        // onAuthorize() will be called when a customer authorizes a payment.
                        // We will finalize the payment here.
                    }

                }, '#paypal-button-container');

            </script>

        </body>
    `
};
