'use strict';
var util = require('util');
var should = require('should');
var request = require('supertest');
var server = require('../../../app');

module.exports = {
  testData: testData,
};

/*
 * data = {
 *   "/foo/%s/bar/%s": [
 *     [ verb, param1, param2, body, status, expected ],
 *     ...
 *   ]
 *   ...
 * }
 */
function testData(data) {
  for (var test in data) {
    data[test].forEach(function (params) {
      var verb = params.shift();
      var expected = params.pop();
      var status = params.pop();
      var body = params.pop();
      var uri = util.format(test, params[0], params[1]).trim();
      var description = verb.toUpperCase() + " " + uri;

      describe(description, function() {
        var shouldReturn = 'Should return ' + status.message + ' error';
        it(shouldReturn, function(done) {

          var op = request(server);
          op = op[verb](uri);
          if (undefined !== body) {
            op = op.send(body);
          }

          op
            .set('Accept', 'application/json')
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
}
