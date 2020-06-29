
var fs = require('fs');
var path = require('path');

var paypal = require('./lib/paypal');
var config = require('./config');

var index = require('./page/index');

module.exports = function (app) {

    app.get('/', (req, res) => {
        res.header('Content-Security-Policy', `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.paypal.com https://*.paypalobjects.com https://*.braintreegateway.com`);

        res.send(index({
            baseURL: req.baseUrl,
            csrf: res.locals._csrf
        }));
    });

    app.post('/api/paypal/order/create/', (req, res) => {
       return paypal.getAccessToken()
           .then(paypal.createOrder)
           .then(response => {
               res.send({ id: response });
           }, err => {
               var error = err || err.message;
               console.error(err);
               res.status(500).send('Internal Service Error, ' + error);
           });
    });

    app.post('/api/paypal/order/:id/capture/', (req, res) => {
        var orderID = req.params.id;

        return paypal.getAccessToken()
            .then(accessToken => {
                return paypal.captureOrder(accessToken, orderID);
            })
            .then(response => {
                res.json(response);
            }, err => {
                var error = err || err.message;
                res.status(500).send('Could not complete payment, ' + error);
            });
    });

    app.get('*', (req, res) => {
        res.status(404);
        res.send(`${req.originalUrl} not found.`);
    });
};
