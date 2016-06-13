'use strict';

var supertest = require('supertest');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var api = supertest('http://localhost:8000/api/v1');

var models = path.join('models', 'monitors');
var monitors = fs.readdirSync(models);

var expected = monitors.map(function (item) {
  var filename = path.join('..', models, item);
  var json = require(filename);
  return json;
});

describe('Monitor API', function () {

  it('GET /monitors', function (done) {
    api
      .get('/monitors')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

  it('GET /monitors/aeiou', function (done) {
    api
      .get('/monitors/aeiou')
      .expect('Content-Type', /json/)
      .expect(200, expected[0], done);
  });

  it('GET /monitors/aeiou/metrics', function (done) {
    api
      .get('/monitors/aeiou/metrics')
      .expect('Content-Type', /json/)
      .expect(200, expected[0].metrics, done);
  });

  it('GET /monitors/aeiou/metrics/aeiou', function (done) {
    api
      .get('/monitors/aeiou/metrics/aeiou')
      .expect('Content-Type', /json/)
      .expect(200, expected[0].metrics[0], done);
  });

});
