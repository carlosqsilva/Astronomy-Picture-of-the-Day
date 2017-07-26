const purify = require("purify-css")

var content = ['./src/*.vue', './src/components/*.vue', './*.html'];
var css = ['./node_modules/bulma/css/bulma.css'];

var options = {
  // Will write purified CSS to this file.
  output: './src/assets/css/purified.css',
  minify: false,
  whitelist: ['is-one-quarter']
};

purify(content, css, options);