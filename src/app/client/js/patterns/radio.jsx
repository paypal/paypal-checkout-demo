import React from 'react';

export let radio = {
  slug: 'radio',

  name: `Radio Fields`,

  fullName: `Radio Fields`,

  intro: (
    <p>
      Create <b>Smart Payment Buttons</b> with radio fields
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Smart Payment Buttons Integration | Radio Fields </title>
        </head>

        <body>
            <!-- Render the radio fields and button containers -->

            <label>
                <input type="radio" name="payment-option" value="paypal" checked>
                <img src="/demo/checkout/static/img/paypal-mark.jpg" alt="Pay with Paypal">
            </label>

            <label>
                <input type="radio" name="payment-option" value="card">
                <img src="/demo/checkout/static/img/card-mark.png" alt="Accepting Visa, Mastercard, Discover and American Express">
            </label>

            <div id="paypal-button-container"></div>
            <div id="card-button-container" class="hidden"><button>Continue</button></div>

            <!-- Include the PayPal JavaScript SDK -->
            <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"></script>

            <script>
                // Listen for changes to the radio fields
                document.querySelectorAll('input[name=payment-option]').forEach(function(el) {
                    el.addEventListener('change', function(event) {

                        // If PayPal is selected, show the PayPal button
                        if (event.target.value === 'paypal') {
                            document.querySelector('#card-button-container').style.display = 'none';
                            document.querySelector('#paypal-button-container').style.display = 'inline-block';
                        }

                        // If Card is selected, show the standard continue button
                        if (event.target.value === 'card') {
                            document.querySelector('#card-button-container').style.display = 'inline-block';
                            document.querySelector('#paypal-button-container').style.display = 'none';
                        }
                    });
                });

                // Hide Non-PayPal button by default
                document.querySelector('#card-button-container').style.display = 'none';

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
