var net = require('net');
var through = require('through');
var argv = require('minimist')(process.argv.slice(2));
var token = argv.token || process.env.LOGENTRIES_TOKEN;

if (!token) {
  console.log('Logentries token not provided. See https://github.com/guillaumervls/logentries-piper for doc.')
  process.exit(1);
}

net.connect({
  host: 'data.logentries.com',
  port: 80
}).

on('connect', function () {
  process.stdin.pipe(process.stdout);
  process.stdin.pipe(through(function (data) {
    this.queue(token + ' ' + data.toString().replace(/(\n|\r\n)+/g, ' ') + '\n');
  })).pipe(this);
});
