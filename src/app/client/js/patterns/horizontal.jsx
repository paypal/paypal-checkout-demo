import React from 'react';

export let horizontal = {
  slug: 'horizontal',

  name: `Horizontal`,

  fullName: `Horizontal Button`,

  intro: (
    <p>
      Create horizontal <b>Smart Payment Buttons</b>
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Smart Payment Buttons Integration | Horizontal Buttons </title>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="paypal-button-container"></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>

            <script>
                // Render the PayPal button into #paypal-button-container
                paypal.Buttons({
                    style: {
                        layout: 'horizontal'
                    }
                }).render('#paypal-button-container');
            </script>
        </body>

        </html>
    `
};
