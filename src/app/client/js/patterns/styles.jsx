
import React from 'react';

export let styles = {

    slug: 'styles',

    name: `Button Styles`,

    fullName: `Express Checkout Custom Button Styles`,

    intro: (
        <p>Customize your <b>PayPal</b> button with colors, sizes and shapes.</p>
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
                    label: 'checkout', // checkout | credit | pay
                    size:  'small',    // small | medium | responsive
                    shape: 'pill',     // pill | rect
                    color: 'blue'      // gold | blue | silver
                },

                payment: function(actions) {
                    return actions.payment.create({
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ]
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
