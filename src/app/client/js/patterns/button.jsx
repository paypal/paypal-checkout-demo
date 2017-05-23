
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

                    // Set your environment
                    env: '${ctx.env}', // sandbox | production

                    // Show the buyer a 'Pay Now' button in the checkout flow
                    commit: true,

                    // payment() is called when the button is clicked
                    payment: function(data, actions) {

                        // We will set up the payment here, and configure the
                        // amount, currency, and other payment options.
                    },

                    // onAuthorize() is called when the buyer approves the payment
                    onAuthorize: function(data, actions) {

                        // We will finalize the payment here, and show a
                        // confirmation message to the buyer
                    }

                }, '#paypal-button-container');
            </script>
        </body>
    `
};
