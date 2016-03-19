'use strict'

var bunyan = require('bunyan')
global.log = bunyan.createLogger({
  src: true,
  name: 'bus-stop-service',
  level: process.env.LOG_LEVEL
})
