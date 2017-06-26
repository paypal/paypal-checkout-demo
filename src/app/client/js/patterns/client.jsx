
import React from 'react';

export let client = {

    slug: 'client',

    name: `Client Side REST`,

    fullName: `Client Side Express Checkout using REST`,

    intro: (
        <p>Create a <b>PayPal Checkout</b> button and accept payments from the client-side using the PayPal REST API, with no server required.</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        </head>

        <body>
            <div id="paypal-button-container"></div>

            <script>
                paypal.Button.render({

                    env: '${ctx.env}', // sandbox | production

                    // PayPal Client IDs - replace with your own
                    // Create a PayPal app: https://developer.paypal.com/developer/applications/create
                    client: {
                        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                        production: '<insert production client id>'
                    },

                    // Show the buyer a 'Pay Now' button in the checkout flow
                    commit: true,

                    // payment() is called when the button is clicked
                    payment: function(data, actions) {

                        // Make a call to the REST api to create the payment
                        return actions.payment.create({
                            payment: {
                                transactions: [
                                    {
                                        amount: { total: '0.01', currency: 'USD' }
                                    }
                                ]
                            }
                        });
                    },

                    // onAuthorize() is called when the buyer approves the payment
                    onAuthorize: function(data, actions) {

                        // Make a call to the REST api to execute the payment
                        return actions.payment.execute().then(function() {
                            window.alert('Payment Complete!');
                        });
                    }

                }, '#paypal-button-container');

            </script>
        </body>
    `
};
