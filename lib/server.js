  'use strict'

  require('dotenv-safe').load();
  var express = require('express')
  var app = express()
  require('./helper')

  var service = require('./bus.service')
  var requestService = require('./bus.request.service')
  var parseService = require('./bus.parse.service')

  var bodyParser = require('body-parser')
  var errorHandler = require('express-errorhandler')
  var cors = require('cors')

  app.use(bodyParser.json())
  app.use(errorHandler())
  app.use(cors())



  app.post('/lines', function(req, res) {
    log.debug('REQ: ', req.body)
      // if (req.body.length > 0) {
    var hashcodes = req.body
    service
      .checkHashCodes(hashcodes)
      .then(function(docs) {
        res.json(docs)
      })
      .catch(function(err) {
        res
          .status(500)
          .json(err)
      })
      // } else {
      //   db.lines.find({}, function(e, docs) {
      //     if (e) {
      //       res
      //         .status(500)
      //         .json(e)
      //     } else {
      //
      //       res.json(docs);
      //     }
      //   })
      // }
  })

  app.get('/line/:line/station/:station/direction/:direction', function(req, res){

    var parameters = {
      line: req.params.line,
      station: req.params.station,
      direction: req.params.direction
    }
    if(requestService.checkParameters(parameters)){
      var urlToCall = requestService.buildRequest(parameters)
      parseService.sendRequest(urlToCall, function(err, previsions){
        if(err){
          res.status(500)
          .json(err)
        }else{
          res.json(previsions)
        }
      })
    }
  })

  var server = app.listen(3000, function() {
    var port = server.address().port
    log.debug('Example app listening at port %s', port)
  })
  module.exports = server
