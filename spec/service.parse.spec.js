  'use strict'

  var bunyan = require('bunyan')
  require('../lib/helper')

  require('./helpers/chai')
  var sinon = require('sinon')
  var rewire = require('rewire')
  var service = rewire('../lib/bus.parse.service')
  var request = require('request')
  var fs = require('fs')

  describe('Service - Parse results from website', function() {
    var mock, find
    beforeEach(function() {})

    afterEach(function() {})

    describe('Site response is ok', function() {
      it('Parse expected http', function(done) {
        var get = sinon.stub(request, 'get')
        fs.readFile(__dirname + '/response.ok.html', 'utf8', function(err, contents) {
          get.yields(null, null, contents)
          if (err) {
            done(err)
          } else {
            log.debug(contents);
            service.sendRequest('dummyRequest', function(err, previsions) {
              if (err) {
                done(err)
              }
              expect(previsions).to.shallowDeepEqual({
                previsions: [{
                  station: 'Nogent-Sur-Marne RER',
                  time: '4 mn'
                }, {
                  station: 'Nogent-Sur-Marne RER',
                  time: '19 mn'
                }]
              })
              done()
            })
          }
        })
      })

    })
  })
