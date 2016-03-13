(function () {
  'use strict'

  require('dotenv-safe').load();
  var express = require('express')
  var app = express()
  var bunyan = require('bunyan')
  var log = bunyan.createLogger({
    src: process.env.LOG_LEVEL === 'debug', //we don't want to slow down the app in production !
    name: 'bus-stop-server',
    level: process.env.LOG_LEVEL
  })

  var service = require('./bus.service')

  var dbURL = process.env.DB_URL
  var mongojs = require('mongojs')
  var db = mongojs(dbURL, ['lines'])

  var bodyParser = require('body-parser')
  var errorHandler = require('express-errorhandler')
  var cors = require('cors')

  app.use(bodyParser.json())
  app.use(errorHandler())
  app.use(cors())

  app.post('/lines', function(req, res) {
    log.debug('REQ: ', req.body)
    if (req.body.length > 0) {
      var hashcodes = req.body
      service.checkHashCodes(hashcodes)
    }else{
      db.lines.find({}, function(e, docs) {
        if (e) {
          res
            .status(500)
            .json(e)
        } else {

          res.json(docs);
        }
      })
    }
  })

  var server = app.listen(3000, function() {
    var port = server.address().port
    log.debug('Example app listening at port %s', port)
  })
  module.exports = server

})()
