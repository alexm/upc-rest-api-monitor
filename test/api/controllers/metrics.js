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

    var dataTests = [
      [ 'get',    '/monitors/notfound/metrics',          undefined,        errors.not_found, errors.not_found ],
      [ 'post',   '/monitors/notfound/metrics',          badMetric,        errors.not_found, errors.not_found ],
      [ 'delete', '/monitors/notfound/metrics',          undefined,        errors.not_found, errors.not_found ],
      [ 'post',   '/monitors/memory/metrics',            freememMetric,    errors.OK,        freememMetric    ],
      [ 'post',   '/monitors/memory/metrics',            freememMetric,    errors.conflict,  errors.conflict  ],
      [ 'get',    '/monitors/memory/metrics',            undefined,        errors.OK,        [freememMetric]  ],
      [ 'post',   '/monitors/memory/metrics',            totalmemMetric,   errors.OK,        totalmemMetric   ],
      [ 'post',   '/monitors/memory/metrics',            totalmemMetric,   errors.conflict,  errors.conflict  ],
      [ 'get',    '/monitors/memory/metrics',            undefined,        errors.OK,        [freememMetric,totalmemMetric] ],
      [ 'get',    '/monitors/notfound/metrics/freemem',  undefined,        errors.not_found, errors.not_found ],
      [ 'put',    '/monitors/notfound/metrics/freemem',  badMetric,        errors.not_found, errors.not_found ],
      [ 'delete', '/monitors/notfound/metrics/freemem',  undefined,        errors.not_found, errors.not_found ],
      [ 'get',    '/monitors/memory/metrics/notfound',   undefined,        errors.not_found, errors.not_found ],
      [ 'put',    '/monitors/memory/metrics/notfound',   badMetric,        errors.not_found, errors.not_found ],
      [ 'delete', '/monitors/memory/metrics/notfound',   undefined,        errors.not_found, errors.not_found ],
      [ 'put',    '/monitors/memory/metrics/freemem',    badMetric,        errors.conflict,  errors.conflict  ],
      [ 'get',    '/monitors/memory/metrics/freemem',    undefined,        errors.OK,        freememMetric    ],
      [ 'put',    '/monitors/memory/metrics/freemem',    freememNewMetric, errors.OK,        freememNewMetric ],
      [ 'get',    '/monitors/memory/metrics/freemem',    undefined,        errors.OK,        freememNewMetric ],
      [ 'delete', '/monitors/memory/metrics/freemem',    undefined,        errors.OK,        freememNewMetric ],
      [ 'get',    '/monitors/memory/metrics/freemem',    undefined,        errors.not_found, errors.not_found ],
      [ 'get',    '/monitors/memory/metrics/totalmem',   undefined,        errors.OK,        totalmemMetric   ],
    ];

    datatest.testData(dataTests);

  });

});
