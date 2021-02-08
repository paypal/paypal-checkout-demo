import React from 'react';

export let style = {
  slug: 'style',

  name: `Style`,

  fullName: `Button Styles`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons</b> with different styles
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Smart Payment Buttons Integration | Button Styles </title> 
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="paypal-button-container"></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>

            <script>
                // Render the PayPal button into #paypal-button-container
                paypal.Buttons({

                    style: {
                        color:  'blue',
                        shape:  'pill',
                        label:  'pay',
                        height: 40
                    }

                }).render('#paypal-button-container');
            </script>
        </body>

        </html>
    `
};
