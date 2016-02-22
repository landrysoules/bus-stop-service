'use strict'

// var assert = require('chai').assert
require('./helpers/chai')
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

  describe('Request lines', function() {
    it('Request all lines', function(done) {
      request(server)
        .post('/lines')
        .set('Content-Type', 'application/json')
        .send([])
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          expect(res.status).to.equal(200)
          expect(res.body).to.equal([{
            pop: 'pop'
          }])
          done()
        })
    })
    it('Request only some lines', function(done) {
      request(server)
        .post('/lines')
        .set('Content-Type', 'application/json')
        .send([{
          _id: 'B206',
          code: '1234'
        }, {
          _id: 'B207',
          code: '5678'
        }])
        .expect(200, done);
    })
  })
})
