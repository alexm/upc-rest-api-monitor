var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var monitors = require('../../../api/helpers/monitors.js');

describe('controllers', function() {

  describe('monitors', function() {

    describe('GET /monitors', function() {

      it('should return a list of monitors', function(done) {

        request(server)
          .get('/monitors')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(monitors.list);

            done();
          });
      });

    });

    describe('GET /monitors/memory', function() {

      it('should return memory monitor', function(done) {

        request(server)
          .get('/monitors/memory')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql(monitors.monitors['memory']);

            done();
          });
      });

    });

  });

});