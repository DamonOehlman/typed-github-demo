# Typed JS (using Flow) Github API demo

This is a simple demo of how a simple application can be written using [flow](https://flowtype.org) and consume the [github users endpoint](https://developer.github.com/v3/users/) with static type checking to help eliminate code errors before runtime.

## Running the Example

To run the example you will need to clone this repo by running the following command:

```
git clone git@github.com:DamonOehlman/typed-github-demo.git
```

Once cloned, install the required npm dependencies:

```
cd typed-github-demo
npm install
```

To actually run the demo script you will need to replace the value of the `GITHUB_ACCESS_TOKEN` const in `github.js` to a [personal access token](https://github.com/settings/tokens) that you create for yourself (as I have revoked mine).

## Questions

Given this is a personal experiment with [Flow](https://flowtype.org/) (my experience goes much deeper with [Closure Compiler](https://developers.google.com/closure/compiler/)) there are definitely things that can be improved.

So... if you have any questions / improvements, feel free to drop and issue or submit a PR.

## License

MIT
