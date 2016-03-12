var path = require('path');
var express = require('express');
var router = express.Router();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');

var compiler = webpack(config);
router.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
router.use(webpackHotMiddleware(compiler));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
