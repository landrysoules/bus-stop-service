  'use strict'

  var bunyan = require('bunyan')
  var log = bunyan.createLogger({
    src: true,
    name: 'bus-stop-server',
    level: process.env.LOG_LEVEL
  })

  // var assert = require('chai').assert
  require('./helpers/chai')
  var sinon = require('sinon')
  var rewire = require('rewire')
  var service = rewire('../lib/bus.service')

  describe('Service', function() {

    describe('Check hashcode', function() {
      it('When hashcode differs, server returns the relevant lines', function() {
        var mock = {
            lines: {
              find: function() {
                return ([])
              }
            }
          }
        var find = sinon.stub(mock.lines, 'find')
        find.yields(null, [{'_id': 'b1', code: '1234'}, {'_id': 'b2', code: '5678'}])
        service.__set__('db', mock)
        service
          .checkHashCodes({'b1': '1111','b2': '2222'})
          .then(function(codes) {
            log.info(codes)
          })
          .catch(function(err) {
            log.error(err)
          })
      })

      it('When nothing differs, server returns empty array')

      it('When parameter is en empty object, server returns all lines')
    })
  })
