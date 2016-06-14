'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');

module.exports = {
  getMonitorList: getMonitorList,
  getMonitor: getMonitor
};

function getMonitorList(req, res) {
  res.json(monitors.list);
}

function getMonitor(req, res) {
  var name = req.swagger.params.monitorId.value;
  res.json(monitors.monitors[name]);
}
