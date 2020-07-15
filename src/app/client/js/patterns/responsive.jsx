
import React from 'react';

export let responsive = {

    slug: 'responsive',

    name: `Responsive`,

    fullName: `Responsive Buttons`,

    intro: (
        <p>Create responsive <b>Smart Payment Buttons</b></p>
    ),

    code: (ctx) => `
        <!DOCTYPE html>
        <html>

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Smart Payment Buttons Integration | Responsive Buttons </title>

            <style>
                /* Media query for mobile viewport */
                @media screen and (max-width: 400px) {
                    #paypal-button-container {
                        width: 100%;
                    }
                }
                
                /* Media query for desktop viewport */
                @media screen and (min-width: 400px) {
                    #paypal-button-container {
                        width: 250px;
                    }
                }
            </style>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="paypal-button-container"></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>

            <script>
                // Render the PayPal button into #paypal-button-container
                paypal.Buttons().render('#paypal-button-container');
            </script>
        </body>

        </html>
    `
};
