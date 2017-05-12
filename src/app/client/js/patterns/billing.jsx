
import React from 'react';

export let billing = {

    slug: 'agreements',

    name: `Agreements`,

    fullName: `Billing Agreements`,

    intro: (
        <p>Create a PayPal button and generate billing agreements using a server-side integration.</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <div id="paypal-button-container"></div>

        <script>

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // Wait for the PayPal button to be clicked

                payment: function() {

                    // Make a call to the merchant server to set up the agreement

                    return paypal.request.post('${ctx.baseURL}/api/paypal/agreement/create/', {}).then(function (response) {
                        return response.payToken;
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Make a call to the merchant server to execute the agreement

                    return paypal.request.post('${ctx.baseURL}/api/paypal/agreement/execute/', { payToken: data.paymentToken }) .then(function() {
                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
