
import React from 'react';

export let server = {

    slug: 'server',

    name: `Server`,

    fullName: `Server integration`,

    intro: (
        <p>Create horizontal <b>Smart Payment Buttons which call your server</b></p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="paypal-button-container"></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>

            <script>
                // Render the PayPal button into #paypal-button-container
                paypal.Buttons({

                    // Set up the transaction
                    createOrder: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/create/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(data) {
                            return data.orderID;
                        });
                    },

                    // Finalize the transaction
                    onApprove: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(details) {
                            // Handle "INSTRUMENT_DECLINED" errors with a restart
                            // when calling the Orders API from your server
                            // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                            if (details.error === 'INSTRUMENT_DECLINED') {
                                return actions.restart();
                            }

                            // Show a success message to the buyer
                            alert('Transaction completed by ' + details.payer.name.given_name + '!');
                        });
                    }


                }).render('#paypal-button-container');
            </script>
        </body>
    `
};
