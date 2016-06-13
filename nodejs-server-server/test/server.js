'use strict';

var supertest = require('supertest');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var api = supertest('http://localhost:8000/api/v1');

describe('Monitor API', function () {
  var models = path.join('models', 'monitors');
  var monitors = fs.readdirSync(models);
  var expected = monitors.map(function (item) {
    var filename = path.join('..', models, item);
    var json = require(filename);
    return json;
  });

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

describe('DataSet API', function () {
  var datasets = path.join('..', 'models', 'datasets.json');
  var expected = require(datasets);

  it('GET /datasets', function (done) {
    api
      .get('/datasets')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

});
