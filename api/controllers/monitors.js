'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');
var errors = require('../helpers/errors.js');

module.exports = {
  getMonitorList: getMonitorList,
  getMonitor: getMonitor
};

function getMonitorList(req, res) {
  res.format({
    'application/json': function () {
      res.json(monitors.list);
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}

function getMonitor(req, res) {
  res.format({
    'application/json': function () {
      var name = req.swagger.params.monitorId.value;
      if (monitors.monitors.hasOwnProperty(name)) {
        res.json(monitors.monitors[name]);
      }
      else {
        res.status(404).json(errors.not_found);
      }
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}
