const request = require('request');
const config = require('../config');

module.exports = {
    createOrder: (accessToken) => {
        const ordersEndpoint = config.urls.sandbox + config.apis.orders;

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
                if (error) return reject(error);
                if (res.statusCode >= 400) return reject(body);

                return resolve(body && body.id);
            });
        });
    },

    captureOrder: (accessToken, orderID) => {
        const ordersEndpoint = config.urls.sandbox + config.apis.orders;
        return new Promise((resolve, reject) => {
            request.post({
                url: `${ordersEndpoint}/${orderID}/capture/`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                json: true
            }, (error, res, body) => {
                if (error) return reject(error);
                if (res.statusCode >= 400) return reject(body);

                if (body.status === 'COMPLETED') {
                    return resolve(body);
                } else {
                    return reject(body);
                }
            });
        });
    },

    getAccessToken: (clientID, secret) => {
        const encodedClientCredentials = Buffer.from(`${clientID}:${secret}`).toString('base64');
        const authEndpoint = config.urls.sandbox + config.apis.auth;

        return new Promise((resolve, reject) => {
            request.post({
                url: authEndpoint,
                headers: {
                    'Authorization': `Basic ${encodedClientCredentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials',
                json: true
            }, (error, res, body) => {
                if (error) return reject(error);
                if (res.statusCode >= 400) return reject(body);

                resolve(body && body.access_token);
            });
        });
    }
};
