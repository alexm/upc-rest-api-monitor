'use strict';
var errors = require('../../../api/helpers/errors.js');
var datatest = require('../helpers/datatest.js');

var OK        = errors.OK;
var CONFLICT  = errors.conflict;
var NOT_FOUND = errors.not_found;
var BAD_REQ   = errors.bad_request;

describe('controllers', function() {

  describe('metrics', function() {

    var unknown = {
      name: 'foobar',
      interval: 123,
      retention: 456,
    };

    var freemem = {
      name: 'freemem',
      interval: 300,
      retention: 86400,
    };

    var totalmem = {
      name: 'totalmem',
      interval: 86400,
      retention: 7*86400,
    };

    var freememNew = {
      name: 'freemem',
      interval: 3600,
      retention: 2*86400,
    };

    var wrong1 = {
      name: 'totalmem',
      foo: 123,
      bar: 456,
    };

    var wrong2 = {
      name: 'totalmem',
      interval: 0,
      retention: -1,
    };

    var dataTests = [
      [ 'get',    '/monitors/notfound/metrics',          null,       NOT_FOUND, NOT_FOUND          ],
      [ 'post',   '/monitors/notfound/metrics',          unknown,    NOT_FOUND, NOT_FOUND          ],
      [ 'delete', '/monitors/notfound/metrics',          null,       NOT_FOUND, NOT_FOUND          ],
      [ 'post',   '/monitors/memory/metrics',            freemem,    OK,        freemem            ],
      [ 'post',   '/monitors/memory/metrics',            freemem,    CONFLICT,  CONFLICT           ],
      [ 'get',    '/monitors/memory/metrics',            null,       OK,        [freemem]          ],
      [ 'post',   '/monitors/memory/metrics',            wrong1,     BAD_REQ,   BAD_REQ            ],
      [ 'post',   '/monitors/memory/metrics',            wrong2,     BAD_REQ,   BAD_REQ            ],
      [ 'post',   '/monitors/memory/metrics',            totalmem,   OK,        totalmem           ],
      [ 'post',   '/monitors/memory/metrics',            totalmem,   CONFLICT,  CONFLICT           ],
      [ 'get',    '/monitors/memory/metrics',            null,       OK,        [freemem,totalmem] ],
      [ 'get',    '/monitors/notfound/metrics/freemem',  null,       NOT_FOUND, NOT_FOUND          ],
      [ 'put',    '/monitors/notfound/metrics/freemem',  unknown,    NOT_FOUND, NOT_FOUND          ],
      [ 'delete', '/monitors/notfound/metrics/freemem',  null,       NOT_FOUND, NOT_FOUND          ],
      [ 'get',    '/monitors/memory/metrics/notfound',   null,       NOT_FOUND, NOT_FOUND          ],
      [ 'put',    '/monitors/memory/metrics/notfound',   unknown,    NOT_FOUND, NOT_FOUND          ],
      [ 'delete', '/monitors/memory/metrics/notfound',   null,       NOT_FOUND, NOT_FOUND          ],
      [ 'put',    '/monitors/memory/metrics/freemem',    unknown,    CONFLICT,  CONFLICT           ],
      [ 'get',    '/monitors/memory/metrics/freemem',    null,       OK,        freemem            ],
      [ 'put',    '/monitors/memory/metrics/freemem',    freememNew, OK,        freememNew         ],
      [ 'put',    '/monitors/memory/metrics/freemem',    freememNew, OK,        freememNew         ],
      [ 'get',    '/monitors/memory/metrics/freemem',    null,       OK,        freememNew         ],
      [ 'delete', '/monitors/memory/metrics/freemem',    null,       OK,        freememNew         ],
      [ 'get',    '/monitors/memory/metrics/freemem',    null,       NOT_FOUND, NOT_FOUND          ],
      [ 'get',    '/monitors/memory/metrics/totalmem',   null,       OK,        totalmem           ],
      [ 'put',    '/monitors/memory/metrics/totalmem',   wrong1,     BAD_REQ,   BAD_REQ            ],
      [ 'put',    '/monitors/memory/metrics/totalmem',   wrong2,     BAD_REQ,   BAD_REQ            ],
      [ 'delete', '/monitors/memory/metrics',            null,       OK,        [totalmem]         ],
      [ 'get',    '/monitors/memory/metrics',            null,       NOT_FOUND, NOT_FOUND          ],
    ];

    datatest.testData(dataTests);

  });

});
