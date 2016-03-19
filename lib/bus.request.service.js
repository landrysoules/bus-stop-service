  'use strict'
  require('dotenv-safe').load();
  var bunyan = require('bunyan')
  var _ = require('lodash')
  var log = bunyan.createLogger({
    src: true,
    name: 'bus-stop-service',
    level: process.env.LOG_LEVEL
  })

  exports.checkParameters = function(parameters) {
    if (!parameters || _.isEmpty(parameters)) {
      return false
    }
    if (parameters.line && parameters.station && parameters.direction) {
      return true
    }
    return false
  }

  exports.buildRequest = function(parameters) {
    return `${process.env.URL_DAY_BUS}${parameters.line}/${parameters.station}/${parameters.direction}`
  }
