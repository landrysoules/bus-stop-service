  'use strict'
  require('dotenv-safe').load();
  require('./helper')

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
