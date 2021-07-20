import React from 'react';

export let client = {
  slug: 'client',

  name: `Client`,

  fullName: `Client integration`,

  intro: (
    <p>
      Create <b>payment buttons</b>
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Checkout Integration | Client Demo </title>
        </head>

        <body>
            <!-- Set up a container element for the button -->
            <div id="paypal-button-container"></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>

            <script>
                // Render the PayPal button into #paypal-button-container
                paypal.Buttons({

                    // Set up the transaction
                    createOrder: function(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: '88.44'
                                }
                            }]
                        });
                    },

                    // Finalize the transaction
                    onApprove: function(data, actions) {
                        return actions.order.capture().then(function(details) {
                            // Show a success message to the buyer (try to avoid alerts in production environments)
                            alert('Transaction completed by ' + details.payer.name.given_name + '!');
                        });
                    }


                }).render('#paypal-button-container');
            </script>
        </body>

        </html>
    `,
};
