
import React from 'react';

export let braintree = {

    slug: 'braintree',

    name: `Braintree SDK`,

    fullName: `Express Checkout using Braintree SDK`,

    intro: (
        <p>Create a PayPal button and accept payments using a Braintree integration.</p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>

        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://www.paypalobjects.com/api/checkout.js"></script>
            <script src="https://js.braintreegateway.com/web/3.11.0/js/client.min.js"></script>
            <script src="https://js.braintreegateway.com/web/3.11.0/js/paypal-checkout.min.js"></script>
        </head>

        <body>
            <div id="paypal-button-container"></div>

            <script>

                var BRAINTREE_SANDBOX_AUTH = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjMDFhZmRkM2Y1OTJmNWVhNTNlMzE5MWQwYmIyMWVjYjM5NzNlZGM1MzkwNDZiMjJmNTA2ODEyNzIzZmRlMTJifGNsaWVudF9pZD1jbGllbnRfaWQkc2FuZGJveCQ0ZHByYmZjNnBoNTk1Y2NqXHUwMDI2Y3JlYXRlZF9hdD0yMDE3LTA0LTI2VDIzOjI2OjU5Ljg3OTA3ODYwNiswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9M3cydHR2d2QyNDY1NDhoZCIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zdzJ0dHZ3ZDI0NjU0OGhkL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvM3cydHR2d2QyNDY1NDhoZC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20vM3cydHR2d2QyNDY1NDhoZCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjpmYWxzZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiYmFyY28uMDMtZmFjaWxpdGF0b3JAZ21haWwuY29tIiwiY2xpZW50SWQiOiJBV3VZdnFnMGtaN2Y5S0V4TVpqZU53T3RjQV8yZVhnOWpMZy1QSnBGX0pnYk44M0YyVml5aEdnV2JCNDg4RGU3MFpucGRBZEI2TUNqekNqSyIsInByaXZhY3lVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIiwidXNlckFncmVlbWVudFVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJVU0QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjN3MnR0dndkMjQ2NTQ4aGQiLCJ2ZW5tbyI6Im9mZiJ9';

                // Render the PayPal button

                paypal.Button.render({

                    // Pass in the Braintree SDK

                    braintree: braintree,

                    // Pass in your Braintree authorization key

                    client: {
                        sandbox: BRAINTREE_SANDBOX_AUTH,
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

                        // Call your server with data.nonce to finalize the payment

                        console.log('Braintree nonce:', data.nonce);

                        // Get the payment and buyer details

                        return actions.payment.get().then(function(payment) {
                            console.log('Payment details:', payment);
                        });
                    }

                }, '#paypal-button-container');

            </script>
        </body>
    `
};
