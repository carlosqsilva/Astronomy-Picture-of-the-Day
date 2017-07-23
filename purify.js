const purify = require("purify-css")

var content = ['./src/*.vue', './src/components/*.vue'];
var css = ['./node_modules/bulma/css/*.css'];

var options = {
  // Will write purified CSS to this file.
  output: './src/assets/css/purified.css',
  minify: true
};

purify(content, css, options);