
var fs = require('fs');
var path = require('path');

// var braintree = require('./lib/braintree');
var paypal = require('./lib/paypal');
var config = require('./config');

var index = require('./page/index');

module.exports = function (app) {

    app.get('/', (req, res) => {

        res.header('Content-Security-Policy', `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.paypal.com https://*.paypalobjects.com https://*.braintreegateway.com;`);

        res.send(index({
            baseURL: req.baseUrl,
            csrf: res.locals._csrf
        }));
    });

    app.get('/api/braintree/client-token/', (req, res) => {
        var BRAINTREE_SANDBOX_AUTH = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjMDFhZmRkM2Y1OTJmNWVhNTNlMzE5MWQwYmIyMWVjYjM5NzNlZGM1MzkwNDZiMjJmNTA2ODEyNzIzZmRlMTJifGNsaWVudF9pZD1jbGllbnRfaWQkc2FuZGJveCQ0ZHByYmZjNnBoNTk1Y2NqXHUwMDI2Y3JlYXRlZF9hdD0yMDE3LTA0LTI2VDIzOjI2OjU5Ljg3OTA3ODYwNiswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9M3cydHR2d2QyNDY1NDhoZCIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zdzJ0dHZ3ZDI0NjU0OGhkL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvM3cydHR2d2QyNDY1NDhoZC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20vM3cydHR2d2QyNDY1NDhoZCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjpmYWxzZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiYmFyY28uMDMtZmFjaWxpdGF0b3JAZ21haWwuY29tIiwiY2xpZW50SWQiOiJBV3VZdnFnMGtaN2Y5S0V4TVpqZU53T3RjQV8yZVhnOWpMZy1QSnBGX0pnYk44M0YyVml5aEdnV2JCNDg4RGU3MFpucGRBZEI2TUNqekNqSyIsInByaXZhY3lVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIiwidXNlckFncmVlbWVudFVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJVU0QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjN3MnR0dndkMjQ2NTQ4aGQiLCJ2ZW5tbyI6Im9mZiJ9';

        res.json(BRAINTREE_SANDBOX_AUTH);
    });

    /*

    app.post('/api/braintree/pay/', (req, res) => {
        return braintree.pay(req.body).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send('Could not complete payment, ' + err);
        });
    });

    */

    app.post('/api/paypal/payment/create/', (req, res) => {
       return paypal.getAccessToken()
           .then(paypal.createPayment)
           .then(response => {
               res.send({ paymentID: response });
           }, err => {
               var error = err || err.message;
               console.error(err);
               res.status(500).send('Internal Service Error, ' + error);
           });
    });

    app.post('/api/paypal/payment/execute/', (req, res) => {

        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;

        if (paymentID && payerID) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executePayment(accessToken, paymentID, payerID);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    var error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });
        } else {
            res.status(500).send('Bad request, need both paymentID and payerID');
        }
    });

    app.post('/api/paypal/agreement/create/', (req, res) => {
        function parseQuery(qstr) {
            var query = {};
            var a = qstr.substr(1).split('&');
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }
            return query;
        }

        return paypal.getAccessToken()
            .then((accessToken) => {

                return paypal.getActiveBillingPlans(accessToken)
                    .then((plans) => {
                        if (plans[0]) {
                            return paypal.createBillingAgreement(accessToken, plans[0].id)
                                .then((response) => {
                                    if (response.links[0].rel === 'approval_url') {
                                        var url = response.links[0].href;
                                        var params = parseQuery(url);

                                        res.send({paymentID: params['token']});
                                    }
                                });
                        } else {
                            // please see https://developer.paypal.com/docs/integration/direct/billing-plans/
                            res.status(500).send('NO ACTIVE BILLING PLANS');
                        }
                    })
            })
    });

    app.post('/api/paypal/agreement/execute/', (req, res) => {
        var paymentID = req.body.paymentID;

        if (paymentID) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executeBillingAgreement(accessToken, paymentID);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    var error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });

        }
    });

    app.get('*', (req, res) => {
        res.status(404);
        res.json({
          statusCode: 404,
          message: `${req.originalUrl} not found.`,
        });
    });
};
