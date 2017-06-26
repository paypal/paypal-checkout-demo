
import React from 'react';

export let credit = {

    slug: 'credit',

    name: `Credit Button`,

    fullName: `Express Checkout Custom Credit Button`,

    intro: (
        <p>Create a <b>PayPal CREDIT</b> button and initialize the credit flow.</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <div id="paypal-button-container"></div>

        <script>

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // Specify the style of the button

                style: {
                    label: 'credit',
                    size:  'small', // small | medium
                    shape: 'rect'   // pill | rect
                },

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },

                // Wait for the PayPal button to be clicked

                payment: function(data, actions) {

                    // Set up a payment and make credit the landing page

                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total: '0.01', currency: 'USD' }
                                }
                            ],

                            payer: {
                                payment_method: 'paypal',
                                external_selected_funding_instrument_type: 'CREDIT'
                            }
                        }
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function() {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
