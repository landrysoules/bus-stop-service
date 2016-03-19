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
  var service = rewire('../lib/bus.request.service')

  describe('Service - Request building process', function() {
    var mock, find
    beforeEach(function() {})

    afterEach(function() {})

    describe('Check received parameters', function() {
      it('Parameters can not be empty', function() {
        expect(service.checkParameters()).to.be.false
        expect(service.checkParameters({})).to.be.false
      })
      it('Parameters must be a well formed object', function() {
        expect(service.checkParameters({
          station: '1'
        })).to.be.false
        expect(service.checkParameters({
          line: '',
          station: null,
          direction: null
        })).to.be.false
        expect(service.checkParameters({
          line: '',
          station: '',
          direction: ''
        })).to.be.false
        expect(service.checkParameters({
          line: 'a',
          station: 'b',
          direction: 'c'
        })).to.be.true
      })
    })

    describe('Build request', function() {
      it('Generate correct url', function() {
        expect(service.buildRequest({
          line: 'B120',
          station: '120_134_135',
          direction: 'R'
        })).to.equal(`${process.env.URL_DAY_BUS}B120/120_134_135/R`)
      })
    })
  })
