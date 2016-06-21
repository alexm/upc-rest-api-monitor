'use strict';
var errors = require('../../../api/helpers/errors.js');
var datatest = require('../helpers/datatest.js');

describe('controllers', function() {

  describe('metrics', function() {

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

    var totalmemMetric = {
      name: 'totalmem',
      interval: 86400,
      retention: 7*86400,
    };

    var freememNewMetric = {
      name: 'freemem',
      interval: 3600,
      retention: 2*86400,
    };

    var dataTests = {
      '/monitors/%s/metrics': [
        [ 'get',    'notfound',             undefined,     errors.not_found, errors.not_found ],
        [ 'post',   'notfound',             badMetric,     errors.not_found, errors.not_found ],
        [ 'delete', 'notfound',             undefined,     errors.not_found, errors.not_found ],
        [ 'post',   'memory',               freememMetric, errors.OK,        freememMetric    ],
        [ 'post',   'memory',               freememMetric, errors.conflict,  errors.conflict  ],
        [ 'get',    'memory',               undefined,     errors.OK,        [freememMetric]  ],
        [ 'post',   'memory',               totalmemMetric, errors.OK,       totalmemMetric   ],
        [ 'post',   'memory',               totalmemMetric, errors.conflict, errors.conflict  ],
        [ 'get',    'memory',               undefined,     errors.OK,        [freememMetric,totalmemMetric] ],
      ],
      '/monitors/%s/metrics/%s': [
        [ 'get',    'notfound', 'freemem',  undefined,     errors.not_found, errors.not_found ],
        [ 'put',    'notfound', 'freemem',  badMetric,     errors.not_found, errors.not_found ],
        [ 'delete', 'notfound', 'freemem',  undefined,     errors.not_found, errors.not_found ],
        [ 'get',    'memory',   'notfound', undefined,     errors.not_found, errors.not_found ],
        [ 'put',    'memory',   'notfound', badMetric,     errors.not_found, errors.not_found ],
        [ 'delete', 'memory',   'notfound', undefined,     errors.not_found, errors.not_found ],
        [ 'put',    'memory',   'freemem',  badMetric,     errors.conflict,  errors.conflict  ],
        [ 'get',    'memory',   'freemem',  undefined,     errors.OK,        freememMetric    ],
        [ 'put',    'memory',   'freemem',  freememNewMetric, errors.OK,     freememNewMetric ],
        [ 'get',    'memory',   'freemem',  undefined,     errors.OK,        freememNewMetric ],
        [ 'delete', 'memory',   'freemem',  undefined,     errors.OK,        freememNewMetric ],
        [ 'get',    'memory',   'freemem',  undefined,     errors.not_found, errors.not_found ],
        [ 'get',    'memory',   'totalmem', undefined,     errors.OK,        totalmemMetric   ],
      ],
    };

    datatest.testData(dataTests);

  });

});
