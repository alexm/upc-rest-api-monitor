var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var monitors = require('../../../api/helpers/monitors.js');
var errors = require('../../../api/helpers/errors.js');

var etag_like = /^W\//;

describe('controllers', function() {

  describe('monitors', function() {

    var monitors_etag = "";

    describe('GET /monitors', function() {

      it('should return a list of monitors', function(done) {

        request(server)
          .get('/monitors')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect('ETag', etag_like)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(monitors.list);
            monitors_etag = res.get('ETag');

            done();
          });
      });

    });

    var memory_etag = "";

    describe('GET /monitors/memory', function() {

      it('should return memory monitor', function(done) {

        request(server)
          .get('/monitors/memory')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect('ETag', etag_like)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(monitors.monitors['memory']);
            memory_etag = res.get('ETag');

            done();
          });
      });

    });

    describe('GET /monitors/notfound', function() {

      it('should return not found error', function(done) {

        request(server)
          .get('/monitors/notfound')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(errors.not_found);

            done();
          });

      });

    });

    describe('GET /monitors (cached)', function() {

      it('should return not modified', function(done) {

        request(server)
          .get('/monitors')
          .set('Accept', 'application/json')
          .set('If-None-Match', monitors_etag)
          .expect(304)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.empty();

            done();
          });

      });

    });

    describe('GET /monitors/memory (cached)', function() {

      it('should return not modified', function(done) {

        request(server)
          .get('/monitors/memory')
          .set('Accept', 'application/json')
          .set('If-None-Match', memory_etag)
          .expect(304)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.empty();

            done();
          });

      });

    });

    describe('GET /monitors (XML)', function() {

      it('should return not acceptable', function(done) {

        request(server)
          .get('/monitors')
          .set('Accept', 'text/xml')
          .set('If-None-Match', monitors_etag)
          .expect(406)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(errors.not_acceptable);

            done();
          });

      });

    });

    describe('GET /monitors/memory (XML)', function() {

      it('should return not acceptable', function(done) {

        request(server)
          .get('/monitors/memory')
          .set('Accept', 'text/xml')
          .set('If-None-Match', memory_etag)
          .expect(406)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(errors.not_acceptable);

            done();
          });

      });

    });

    var monitors_html_etag = "";

    describe('GET /monitors.html', function() {

      it('should return a list of monitors in HTML', function(done) {

        request(server)
          .get('/monitors.html')
          .set('Accept', 'text/html')
          .expect('Content-Type', /html/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.match(/html/);
            monitors_html_etag = res.get('ETag');

            done();
          });

      });

    });

    describe('GET /monitors.html (JSON)', function() {

      it('should return not acceptable', function(done) {

        request(server)
          .get('/monitors.html')
          .set('Accept', 'application/json')
          .expect(406)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(errors.not_acceptable);

            done();
          });

      });

    });

    describe('GET /monitors.html (cached)', function() {

      it('should return not modified', function(done) {

        request(server)
          .get('/monitors.html')
          .set('Accept', 'text/html')
          .set('If-None-Match', monitors_html_etag)
          .expect(304)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.empty();

            done();
          });

      });

    });

  });

});
