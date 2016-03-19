'use strict'

var chai = require('chai')
chai.use(require('chai-shallow-deep-equal'))
chai.use(require('chai-as-promised'));
chai.use(require('chai-json-equal'));
chai.config.includeStack = true

global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert
