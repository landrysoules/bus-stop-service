// (function() {
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
    return Q.Promise(function(resolve, reject, notify) {
      log.warn('pop1')
      log.warn('db', db)
      var linesToReturn = []
      log.warn('pop2')
      try{
      db.lines.find({}, function(e, docs) {
        log.warn('pop3')
        if (e) {
          log.warn('pop4')
          log.error('err', e)
          reject(e)
        } else {
          log.warn('else')
          log.warn('docs', docs)
          docs.forEach(function(doc) {
            log.warn('doc', doc)
            var receivedCode = hashcodes[doc._id]
            log.warn('received code', receivedCode)
            if (receivedCode) {
              if (receivedCode.code !== doc.code) {
                linesToReturn.push(doc)
              }
            }
          })
          log.warn('pop5')
          resolve(linesToReturn)
        }
      })
      log.warn('pop6')
    }catch(err){
      log.error(err)
    }
    })
  }
// })()
