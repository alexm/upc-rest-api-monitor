'use strict';
var errors = require('../../../api/helpers/errors.js');
var datatest = require('../helpers/datatest.js');

var badMetric = {
  name: 'foobar',
  interval: 123,
  retention: 456,
};

var freememMetric = {
  name: 'freemem',
  interval: 300,
  retention: 86400,
};

describe('controllers', function() {

  describe('metrics', function() {

    var dataTests = {
      '/monitors/%s/metrics': [
        [ 'get',    'notfound',             undefined, errors.not_found, errors.not_found ],
        [ 'post',   'notfound',             badMetric, errors.not_found, errors.not_found ],
        [ 'delete', 'notfound',             undefined, errors.not_found, errors.not_found ],
        [ 'post',   'memory',               freememMetric, errors.OK, freememMetric ],
        [ 'post',   'memory',               freememMetric, errors.conflict, errors.conflict ],
      ],
      '/monitors/%s/metrics/%s': [
        [ 'get',    'notfound', 'freemem',  undefined, errors.not_found, errors.not_found ],
        [ 'put',    'notfound', 'freemem',  badMetric, errors.not_found, errors.not_found ],
        [ 'delete', 'notfound', 'freemem',  undefined, errors.not_found, errors.not_found ],
        [ 'get',    'memory',   'notfound', undefined, errors.not_found, errors.not_found ],
        [ 'put',    'memory',   'notfound', badMetric, errors.not_found, errors.not_found ],
        [ 'delete', 'memory',   'notfound', undefined, errors.not_found, errors.not_found ],
        [ 'put',    'memory',   'freemem',  badMetric, errors.conflict,  errors.conflict  ],
      ],
    };

    datatest.testData(dataTests);

  });

});
