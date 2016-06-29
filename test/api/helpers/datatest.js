'use strict';
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

module.exports = {
  testData: testData,
};

/*
 * tests = [
 *   [ verb, uri, body, status, result, headers ],
 *   ...
 * ]
 */
function testData(tests) {
  tests.forEach(function (test) {
    var verb = test[0];
    var uri = test[1];
    var body = test[2];
    var status = test[3];
    var expected = test[4];
    var headers = test[5];

    var description = verb.toUpperCase() + " " + uri;

    describe(description, function() {
      var shouldReturn = 'Should return ' + status.message + ' error';
      it(shouldReturn, function(done) {

        var op = request(server);
        op = op[verb](uri);
        if (null !== body) {
          op = op.send(body);
        }

        // Set default accept for client
        op.set('Accept', 'application/json');

        // Set additional headers for client
        if (undefined !== headers) {
          Object.keys(headers).map(function (item) {
            op.set(item, headers[item]);
          });
        }

        op
          .expect('Content-Type', /json/)
          .expect(status.code)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(expected);

            done();
          });

      });
    });
  });
}
