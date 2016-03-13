// 'use strict'
//
// // var assert = require('chai').assert
// require('./helpers/chai')
// var superagent = require('superagent')
//
// describe('Service', function() {
//   var server
//
//   describe('Request lines', function() {
//     it('Request all lines', function(done) {
//       superagent.post('http://localhost:3000/lines')
//         .send([])
//         .end(function(e, res) {
//           // console.log(res.body)
//           expect(e).to.eql(null)
//           expect(res.body.length).to.eql(1)
//           expect(res.body[0]._id.length).to.eql(24)
//           var id = res.body[0]._id
//           done()
//         })
//         // request(server)
//         //   .post('/lines')
//         //   .set('Content-Type', 'application/json')
//         //   .send([])
//         //   .end(function(err, res) {
//         //     if (err) {
//         //       return done(err)
//         //     }
//         //     expect(res.status).to.equal(200)
//         //     expect(res.body).to.equal([{
//         //       pop: 'pop'
//         //     }])
//         //     done()
//         //   })
//     })
//     // it('Request only some lines', function(done) {
//     //   request(server)
//     //     .post('/lines')
//     //     .set('Content-Type', 'application/json')
//     //     .send([{
//     //       _id: 'B206',
//     //       code: '1234'
//     //     }, {
//     //       _id: 'B207',
//     //       code: '5678'
//     //     }])
//     //     .expect(200, done);
//     // })
//   })
// })
