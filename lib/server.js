'use strict'

var express = require('express')
var app = express()
var bunyan = require('bunyan')
var log = bunyan.createLogger({
  src: true,
  name: 'bus-stop-server',
  level: 'debug'
})
var needle = require('needle')

var DB_USER_NAME = process.env.DB_USER_NAME
var DB_PASSWORD = process.env.DB_PASSWORD
var DB_URL = process.env.DB_URL


app.get('/apikey', function(req, res) {
  needle
    .post(DB_URL, null,{
      username: DB_USER_NAME,
      password: DB_PASSWORD
    }, function(err, resp) {
      if (err) {
        res.status(500).send('Problem on Couch server')
      } else {
        log.debug(resp.body)
        res.status(200).send('ok')
      }
    })
})

var server = app.listen(3000, function() {
  var port = server.address().port
  log.debug('Example app listening at port %s', port)
})

module.exports = server
