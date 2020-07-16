'use strict';

const express = require('express');
const server = require('./server');
const config = require('./config');

const PORT = 8002;
const serverConfig = {
  sandboxCredentials: {
    clientID:
      process.env.PAYPAL_CHECKOUT_DEMO_CLIENT_ID || config.client.sandbox,
    secret: process.env.PAYPAL_CHECKOUT_DEMO_CLIENT_SECRET || '',
  },
};

express()
  .use('/demo/checkout', server(serverConfig))
  .listen(PORT, function () {
    console.log(`Server started at http://localhost:${PORT}/demo/checkout`);
  });
