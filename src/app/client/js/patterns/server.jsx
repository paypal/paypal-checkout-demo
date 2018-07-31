
import React from 'react';

export let server = {

    slug: 'server',

    name: `Server Side REST`,

    fullName: `Server Side PayPal Checkout using REST`,

    intro: (
        <p>Create a <b>PayPal Checkout</b> button and accept payments by calling the PayPal REST API from your server. Learn how to implement a <b>PayPal Checkout Server Integration </b> <a href="https://developer.paypal.com/docs/checkout/how-to/server-integration/">here</a>.
        </p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        </head>

        <body>
            <div id="paypal-button-container"></div>

            <script>
                paypal.Button.render({

                    env: '${ctx.env}', // sandbox | production

                    // Show the buyer a 'Pay Now' button in the checkout flow
                    commit: true,

                    // payment() is called when the button is clicked
                    payment: function() {

                        // Set up a url on your server to create the payment
                        var CREATE_URL = '${ctx.baseURL}/api/paypal/payment/create/';

                        // Make a call to your server to set up the payment
                        return paypal.request.post(CREATE_URL)
                            .then(function(res) {
                                return res.paymentID;
                            });
                    },

                    // onAuthorize() is called when the buyer approves the payment
                    onAuthorize: function(data, actions) {

                        // Set up a url on your server to execute the payment
                        var EXECUTE_URL = '${ctx.baseURL}/api/paypal/payment/execute/';

                        // Set up the data you need to pass to your server
                        var data = {
                            paymentID: data.paymentID,
                            payerID: data.payerID
                        };

                        // Make a call to your server to execute the payment
                        return paypal.request.post(EXECUTE_URL, data)
                            .then(function (res) {
                                window.alert('Payment Complete!');
                            });
                    }

                }, '#paypal-button-container');
            </script>
        </body>
    `
};
