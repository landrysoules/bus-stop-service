  'use strict'
  require('dotenv-safe').load();
  require('./helper')
  var _ = require('lodash')


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
