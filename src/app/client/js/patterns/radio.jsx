import React from 'react';

export let radio = {
  slug: 'radio',

  name: `Radio Fields`,

  fullName: `Radio Fields`,

  intro: (
    <p>
      Create <b>payment buttons</b> with radio fields
    </p>
  ),

  code: (ctx) => `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <!-- Add meta tags for mobile and IE -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title> PayPal Checkout Integration | Radio Fields </title>
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
            <script src="https://www.paypal.com/sdk/js?client-id=test&currency=USD"></script>

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
                    },

                    // Call your server to set up the transaction
                    createOrder: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/create/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            return orderData.id;
                        });
                    },

                    // Call your server to finalize the transaction
                    onApprove: function(data, actions) {
                        return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
                            method: 'post'
                        }).then(function(res) {
                            return res.json();
                        }).then(function(orderData) {
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you

                            // This example reads a v2/checkout/orders capture response, propagated from the server
                            // You could use a different API or structure for your 'orderData'
                            var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                            if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                                return actions.restart(); // Recoverable state, per:
                                // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                            }

                            if (errorDetail) {
                                var msg = 'Sorry, your transaction could not be processed.';
                                if (errorDetail.description) msg += '\\n\\n' + errorDetail.description;
                                if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                                return alert(msg); // Show a failure message (try to avoid alerts in production environments)
                            }

                            // Successful capture! For demo purposes:
                            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                            var transaction = orderData.purchase_units[0].payments.captures[0];
                            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\\n\\nSee console for all available details');
        
                            // Replace the above to show a success message within this page, e.g.
                            // const element = document.getElementById('paypal-button-container');
                            // element.innerHTML = '';
                            // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                            // Or go to another URL:  actions.redirect('thank_you.html');
                        });
                    }
                }).render('#paypal-button-container');
            </script>
        </body>

        </html>
    `,
};
