  'use strict'

  var bunyan = require('bunyan')
  var log = bunyan.createLogger({
    src: true,
    name: 'bus-stop-service',
    level: process.env.LOG_LEVEL
  })

  require('./helpers/chai')
  var sinon = require('sinon')
  var rewire = require('rewire')
  var service = rewire('../lib/bus.service')

  describe('Service - Update process', function() {
    var mock, find
    beforeEach(function() {
      mock = {
        lines: {
          find: function() {
            return ([])
          }
        }
      }
      find = sinon.stub(mock.lines, 'find')
      find.yields(null, [{
        '_id': 'b1',
        code: '1234'
      }, {
        '_id': 'b2',
        code: '5678'
      }])
      service.__set__('db', mock)
    })

    afterEach(function() {
      find.restore()
    })

    describe('Check hashcode', function() {
      it('When hashcode differs, server returns the relevant lines', function() {

        return expect(service.checkHashCodes({
          'b1': '1234',
          'b2': '2222'
        })).to.eventually.shallowDeepEqual([{
          '_id': 'b2',
          code: '5678'
        }])

      })

      it('When nothing differs, server returns empty array', function() {

        return expect(service.checkHashCodes({
          'b1': '1234',
          'b2': '5678'
        })).to.eventually.shallowDeepEqual([])
      })

      it('When parameter is en empty object, server returns all lines', function() {
        return expect(service.checkHashCodes({})).to.eventually.shallowDeepEqual([{
          '_id': 'b1',
          code: '1234'
        }, {
          '_id': 'b2',
          code: '5678'
        }])
      })

      it('When parameter is null, server returns all lines', function() {
        return expect(service.checkHashCodes(null)).to.eventually.shallowDeepEqual([{
          '_id': 'b1',
          code: '1234'
        }, {
          '_id': 'b2',
          code: '5678'
        }])
      })
    })
  })
