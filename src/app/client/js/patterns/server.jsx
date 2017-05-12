
import React from 'react';

export let server = {

    slug: 'server',

    name: `Server Side REST`,

    fullName: `Server Side Express Checkout using REST`,

    intro: (
        <p>Create a <b>PayPal Checkout</b> button and accept payments, by calling the PayPal REST API from your server.</p>
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

                    // Make a call to the merchant server to set up the payment

                    var CREATE_URL = '${ctx.baseURL}/api/paypal/payment/create/';

                    return paypal.request.post(CREATE_URL).then(function(res) {
                        return res.payToken;
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Make a call to the merchant server to execute the payment

                    var EXECUTE_URL = '${ctx.baseURL}/api/paypal/payment/execute/';

                    var data = {
                        payToken: data.paymentID,
                        payerId: data.payerID
                    };

                    return paypal.request.post(EXECUTE_URL, data).then(function (res) {

                        window.alert('Payment Complete!');
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};
