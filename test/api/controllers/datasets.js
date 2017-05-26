'use strict';
var errors = require('../../../api/helpers/errors.js');
var datatest = require('../helpers/datatest.js');

var OK = errors.OK;

describe('controllers', function() {

  describe('datasets', function() {

    var freemem = {
      name: 'freemem',
      interval: 300,
      retention: 86400,
    };

    var dataset = {
      filter: {
        monitor: 'memory',
        metric: 'freemem',
        begin: 1,
        end: 9999999999999,
        limit: 5
      },
      values: []
    };

    var dataTests = [
      [ 'post', '/monitors/memory/metrics', freemem, OK, freemem ],
      [ 'get', '/datasets?monitor=memory&metric=freemem&begin=1&end=9999999999999&limit=5', null, OK, dataset ],
      [ 'delete', '/monitors/memory/metrics/freemem', null, OK, freemem ],
    ];

    datatest.testData(dataTests);

  });

});
