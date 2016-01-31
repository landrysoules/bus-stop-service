'use strict'

var assert = require('chai').assert
var request = require('supertest')
require = require('really-need')

describe('Service', function() {
  var server

  beforeEach(function() {
    server = require('../lib/server', {
      bustCache: true
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Request a couch temporary key', function() {
    it('Return API key if credentials are correct', function(done) {
      request(server)
        .get('/apikey')
        .expect(200, done);
    })
  })
})
