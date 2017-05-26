'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');
var datasets = require('../helpers/datasets.js');
var errors = require('../helpers/errors.js');

module.exports = {
  findDataSet: findDataSet
};

function findDataSet(req, res) {
  res.format({
    'application/json': function () {
      console.log(datasets.data);
      res.json(datasets.find(
        req.swagger.params.monitor.value,
        req.swagger.params.metric.value,
        Number(req.swagger.params.begin.value),
        Number(req.swagger.params.end.value),
        Number(req.swagger.params.limit.value)
      ));
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}
