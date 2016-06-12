'use strict';

var url = require('url');


var Monitor = require('./MonitorService');


module.exports.monitorsGET = function monitorsGET (req, res, next) {
  Monitor.monitorsGET(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdGET = function monitorsMonitorIdGET (req, res, next) {
  Monitor.monitorsMonitorIdGET(req.swagger.params, res, next);
};
