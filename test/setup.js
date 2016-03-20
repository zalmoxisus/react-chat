require('babel-register')();
var jsdom = require('jsdom').jsdom;
var hook = require('css-modules-require-hook');
var sass = require('node-sass');

hook({
  extensions: ['.scss'],
  preprocessCss: function (css) {
    var result = sass.renderSync({
      data: css
    });
    return result.css;
  }
});

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
