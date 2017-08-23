
import React from 'react';

export let generic = {

    slug: 'generic',

    name: `Generic Button`,

    fullName: `Express Generic Custom Button`,

    intro: (
        <p>Customize your <b>PayPal Generic</b> button with colors, sizes and shapes.</p>
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
                    label: 'generic',
                    size:  'medium',    // small | medium | large | responsive
                    shape: 'rect',     // pill | rect
                    color: 'black',     // gold | blue | silver | black
                    tagline: false    
                },

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },

                payment: function(data, actions) {
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

                onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function() {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
