#!/usr/bin/env node

var net = require('net');
var through = require('through');
var argv = require('minimist')(process.argv.slice(2));
var token = argv.token || process.env.LOGENTRIES_TOKEN;

net.connect({
  host: 'data.logentries.com',
  port: 80
}).

on('connect', function () {
  process.stdin.pipe(process.stdout);
  if (!token) {
    console.error('[WARNING] logentries-piper : Logentries token not provided => not pushing logs to Logentries.');
    console.error('See https://github.com/guillaumervls/logentries-piper for doc.');
    console.error('-------command output is still forwarded below----------------');
    return this.end();
  }
  process.stdin.pipe(through(function (data) {
    this.queue(token + ' ' + data.toString().replace(/(\n|\r\n)+/g, ' ') + '\n');
  })).pipe(this);
});
