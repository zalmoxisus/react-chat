var app = require('express')();

module.exports.run = function(worker) {
  console.log('   >> Worker PID:', process.pid);

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  httpServer.on('request', app);

  app.use('/', require('../bin/runWebpack')); // Remove if you don't use webpack
};
