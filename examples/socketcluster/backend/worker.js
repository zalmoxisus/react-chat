var app = require('express')();

module.exports.run = function(worker) {
  console.log('   >> Worker PID:', process.pid);

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  httpServer.on('request', app);

  app.use('/', require('../bin/runWebpack')); // Remove if you don't use webpack

  scServer.on('connection', function (socket) {
    console.log('User connected');

    socket.on('some-chat-room', function (data) {
      scServer.exchange.publish('some-chat-room', data);
      console.log('Message:', data);
    });

    socket.on('disconnect', function () {
      console.log('User disconnected');
    });
  });
};
