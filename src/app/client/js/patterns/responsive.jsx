
import React from 'react';

export let responsive = {

    slug: 'responsive',

    name: `Responsive Button`,

    fullName: `PayPal Checkout Custom Button with size as Responsive`,

    intro: (
        <p>If you set size: 'responsive', the button will match the width of the parent element, and auto-calculate an appropriate height based on the width.</p>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

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
                    display: inline-block;
                }
            }
            
        </style>
        
        <div id="paypal-button-container"></div>
        
        <script>
        
            paypal.Button.render({
                
                // Set your environment
        
                env: '${ctx.env}', // sandbox | production
        
                // Specify the style of the button
        
                style: {
                    label: 'checkout',  // checkout | credit | pay | buynow | generic
                    size:  'responsive', // small | medium | large | responsive
                    shape: 'pill',   // pill | rect
                    color: 'gold'   // gold | blue | silver | black
                },
        
                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        
                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },
        
                // Wait for the PayPal button to be clicked
        
                payment: function(data, actions) {
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
                    return actions.payment.execute().then(function() {
                        window.alert('Payment Complete!');
                    });
                }
            
            }, '#paypal-button-container');
        
        </script>

    `
};
