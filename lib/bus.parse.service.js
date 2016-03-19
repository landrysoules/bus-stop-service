  'use strict'
  require('dotenv-safe').load();
  var cheerio = require('cheerio')

  var request = require('request')

  exports.sendRequest = function(req, callback) {
    request.get(req, function(error, response, body) {
          //TODO: return name of direction
      if (error) {
        callback(error)
      } else {
        var $ = cheerio.load(body)
        var next1Name = $('#prochains_passages > fieldset > table > tbody > tr:nth-child(1) > td:nth-child(1)')
        var next1Time = $('#prochains_passages > fieldset > table > tbody > tr:nth-child(1) > td:nth-child(2)')
        var next2Name = $('#prochains_passages > fieldset > table > tbody > tr.even > td:nth-child(1)')
        var next2Time = $('#prochains_passages > fieldset > table > tbody > tr.even > td:nth-child(2)')
        var direction = $('#prochains_passages > fieldset > span')
        var previsions = {
          direction: direction.text(),
          previsions: [{
            station: next1Name.text(),
            time: next1Time.text()
          }, {
            station: next2Name.text(),
            time: next2Time.text()
          }]
        }
        callback(null, previsions)
      }
    })
  }
