var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var SocketCluster = require('socketcluster').SocketCluster;

var port = Number(argv.p) || 4001;

new SocketCluster({
  port,
  workers: Number(argv.w) || 1,
  // brokers: Number(argv.b) || 1,
  appName: argv.n || null,
  workerController: path.join(__dirname, '../backend/worker.js'),
  // brokerController: path.join(__dirname, '../__dirname + '/backend/broker.js'),
  socketChannelLimit: 1000,
  rebootWorkerOnCrash: argv['auto-reboot'] != false
});
