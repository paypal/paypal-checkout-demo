
import React from 'react';

export let braintree = {

    slug: 'braintree',

    name: `Braintree SDK`,

    fullName: `PayPal Checkout using Braintree SDK`,

    intro: (
        <p>Create a PayPal button and accept payments using a Braintree integration.</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
            <script src="https://js.braintreegateway.com/web/3.26.0/js/client.min.js"></script>
            <script src="https://js.braintreegateway.com/web/3.26.0/js/paypal-checkout.min.js"></script>
        </head>

        <body>
            <div id="paypal-button-container"></div>

            <script>

                // Render the PayPal button

                paypal.Button.render({

                    // Pass in the Braintree SDK

                    braintree: braintree,

                    // Pass in your Braintree authorization key

                    client: {
                        sandbox: paypal.request.get('${ctx.baseURL}/api/braintree/client-token/'),
                        production: '<insert production auth key>'
                    },

                    // Set your environment

                    env: '${ctx.env}', // sandbox | production

                    // Wait for the PayPal button to be clicked

                    payment: function(data, actions) {

                        // Make a call to create the payment

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

                    // Wait for the payment to be authorized by the customer

                    onAuthorize: function(data, actions) {
                        return actions.payment.tokenize().then(function(data) {
                            console.log('Braintree nonce:', data.nonce);
                        });
                    }

                }, '#paypal-button-container');

            </script>
        </body>
    `
};
