
import React from 'react';

export let validation = {

    slug: 'validation',

    name: `Validation`,

    fullName: `Express Checkout with validation`,

    intro: (
        <p>Create a PayPal button and only trigger checkout when the form validates</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <p id="msg" class="hidden error">Please check the checkbox</p>

        <p>
            <label><input id="check" type="checkbox"> Check here to continue</label>
        </p>

        <div id="paypal-button-container"></div>

        <script>

            function isValid() {
                return document.querySelector('#check').checked;
            }

            function onChangeCheckbox(handler) {
                document.querySelector('#check').addEventListener('change', handler);
            }

            function toggleValidationMessage() {
                document.querySelector('#msg').style.display = (isValid() ? 'none' : 'block');
            }

            function toggleButton(actions) {
                return isValid() ? actions.enable() : actions.disable();
            }

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },

                validate: function(actions) {
                    toggleButton(actions);

                    onChangeCheckbox(function() {
                        toggleButton(actions);
                    });
                },

                onClick: function() {
                    toggleValidationMessage();
                },

                // Wait for the PayPal button to be clicked

                payment: function(data, actions) {

                    // Make a client-side call to the REST api to create the payment

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

                    // Execute the payment

                    return actions.payment.execute().then(function() {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
