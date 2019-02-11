var request = require('request');
var config = require('../config');

module.exports = {
    createOrder: (accessToken) => {
        var ordersEndpoint = config.urls['sandbox'] + config.apis.orders;

        return new Promise((resolve, reject) => {
           request.post({
               url: ordersEndpoint,
               headers: {
                   'Authorization': `Bearer ${accessToken}`,
                   'Content-Type': 'application/json'
               },
               json: {
                   intent: 'CAPTURE',
                   purchase_units: [{
                       amount: {
                           currency_code: 'USD',
                           value: '0.01'
                       }
                   }]
               }

           }, (error, res, body) => {

               if (error || res.statusCode >= 400) {
                   error ? reject(error) : reject(res.statusMessage);
               } else {
                   resolve(body && body.id);
               }
           });
        });
    },

    captureOrder: (accessToken, orderID) => {
        var ordersEndpoint = config.urls['sandbox'] + config.apis.orders;
        return new Promise((resolve, reject) => {
            request.post({
                url: `${ordersEndpoint}/${orderID}/capture/`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }, (error, res, body) => {
                body = JSON.parse(body);

                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else if (body.status === 'COMPLETED') {
                    resolve(body);
                } else {
                    reject(body);
                }
            });
        });
    },

    getAccessToken: () => {
        var encodedClientId = new Buffer(`${config.client['sandbox']}:`).toString('base64');
        var authEndpoint = config.urls['sandbox'] + config.apis.auth;

        return new Promise((resolve, reject) => {
            request.post({
                url: authEndpoint,
                headers: {
                    'Authorization': `Basic ${encodedClientId}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            }, (error, res, body) => {
                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else {

                    body = body && JSON.parse(body);

                    var accessToken = body && body.access_token;
                    resolve(accessToken);
                }
            });

        });
    }
};
