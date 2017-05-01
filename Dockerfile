FROM node:4.5

RUN apt-get update && apt-get install -y build-essential

ENV APP_HOME /paypal-checkout-demo

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# npm
COPY package.json $APP_HOME
RUN npm install

# build the app
COPY .babelrc $APP_HOME
COPY webpack.conf.js $APP_HOME
COPY src $APP_HOME/src
RUN npm run build
