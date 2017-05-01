# Contributing to paypal-checkout-demo

We are always looking for ways to make our demo site better. Adding features and fixing bugs allows everyone who depends on this code to create better, more stable applications.
Feel free to raise a pull request to us. Our team would review your proposed modifications and, if appropriate, merge
your changes into our code. Ideas and other comments are also welcome.

## Getting Started

1. Create your own [fork](https://help.github.com/articles/fork-a-repo) of this [repository](../../fork).

```bash
# Clone it
$ git clone git@github.com:me/paypal-checkout-demo.git

# Change directory
$ cd paypal-checkout-demo

# Add the upstream repo
$ git remote add upstream git@github.com:paypal/paypal-checkout-demo.git

# Get the latest upstream changes
$ git pull upstream

# Install dependencies
$ npm install
```

## Making Changes

1. Make sure that your changes adhere to the current coding conventions used throughout the project, indentation, accurate comments, etc.

## Submitting Changes

1. Commit your changes in logical chunks, i.e. keep your changes small per single commit.
1. Locally merge (or rebase) the upstream branch into your topic branch: `$ git pull upstream && git merge`.
1. Push your topic branch up to your fork: `$ git push origin <topic-branch-name>`.
1. Open a [Pull Request](https://help.github.com/articles/using-pull-requests) with a clear title and description.

If you have any questions about contributing, please feel free to contact us by posting your questions using a [GitHub issue](https://github.com/paypal/paypal-checkout-demo/issues).

Copyright 2017, PayPal under [the Apache 2.0 license](LICENSE.txt).