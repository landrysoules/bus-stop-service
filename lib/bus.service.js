  'use strict'

  var bunyan = require('bunyan')
  var log = bunyan.createLogger({
    src: true,
    name: 'bus-stop-server',
    level: process.env.LOG_LEVEL
  })

  require('dotenv-safe').load();
  var dbURL = process.env.DB_URL
  var mongojs = require('mongojs')
  var db = mongojs(dbURL, ['lines'])
  var Q = require('q')

  exports.checkHashCodes = function(hashcodes) {
    if (!hashcodes) {
      hashcodes = {}
    }
    return Q.Promise(function(resolve, reject, notify) {
      log.warn('hashcodes', hashcodes)
      var linesToReturn = []
      try {
        db.lines.find({}, function(e, docs) {
          if (e) {
            log.error('err', e)
            reject(e)
          } else {
            docs.forEach(function(doc) {
              var receivedCode = hashcodes[doc._id]
              log.info('received code', receivedCode)
              log.info('doc code', doc.code)
              if (receivedCode) {
                if (receivedCode !== doc.code) {
                  linesToReturn.push(doc)
                }
              } else {
                linesToReturn.push(doc)
              }
            })
            resolve(linesToReturn)
          }
        })
      } catch (err) {
        log.error(err)
        reject(err)
      }
    })
  }
