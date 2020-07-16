const paypal = require("./lib/paypal");

const index = require("./page/index");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.header(
            "Content-Security-Policy",
            `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.paypal.com https://*.paypalobjects.com https://*.braintreegateway.com;`
        );

        res.send(
            index({
                baseURL: req.baseUrl,
                csrf: res.locals._csrf
            })
        );
    });

    app.post("/api/paypal/order/create/", (req, res) => {
        const { clientID, secret } = req.sandboxCredentials;

        return paypal
            .getAccessToken(clientID, secret)
            .then(paypal.createOrder)
            .then(response => {
                res.json({ id: response });
            })
            .catch(err => {
                if (typeof err === "object") {
                    res.status(500).json(err);
                } else {
                    const error = err || err.message;
                    res.status(500).send(`Internal Service Error, ${error}`);
                }
            });
    });

    app.post("/api/paypal/order/:id/capture/", (req, res) => {
        const orderID = req.params.id;
        const { clientID, secret } = req.sandboxCredentials;

        return paypal
            .getAccessToken(clientID, secret)
            .then(accessToken => {
                return paypal.captureOrder(accessToken, orderID);
            })
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                if (typeof err === "object") {
                    res.status(500).json(err);
                } else {
                    const error = err || err.message;
                    res.status(500).send(`Could not complete payment, ${error}`);
                }
            });
    });

    app.get("*", (req, res) => {
        res.status(404);
        res.send(`${req.originalUrl} not found.`);
    });
};
