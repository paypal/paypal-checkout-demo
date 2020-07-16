const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');

module.exports = function (options) {
  options = options || {};
  const app = express();

  app.use(
    '/static/js',
    express.static(path.join(__dirname, '../build'), { maxAge: 86400000 })
  );
  app.use(
    '/static',
    express.static(path.join(__dirname, '../client'), { maxAge: 86400000 })
  );

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    function setup(req, res, next) {
      req.v4app = this;
      req.sandboxCredentials = options.sandboxCredentials || {};
      next();
    }.bind(this)
  );

  routes(app);

  return app;
};
