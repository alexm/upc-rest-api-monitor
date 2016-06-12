'use strict';

var url = require('url');


var Metric = require('./MetricService');


module.exports.monitorsMonitorIdMetricsDELETE = function monitorsMonitorIdMetricsDELETE (req, res, next) {
  Metric.monitorsMonitorIdMetricsDELETE(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdMetricsGET = function monitorsMonitorIdMetricsGET (req, res, next) {
  Metric.monitorsMonitorIdMetricsGET(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdMetricsMetricIdDELETE = function monitorsMonitorIdMetricsMetricIdDELETE (req, res, next) {
  Metric.monitorsMonitorIdMetricsMetricIdDELETE(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdMetricsMetricIdGET = function monitorsMonitorIdMetricsMetricIdGET (req, res, next) {
  Metric.monitorsMonitorIdMetricsMetricIdGET(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdMetricsMetricIdPUT = function monitorsMonitorIdMetricsMetricIdPUT (req, res, next) {
  Metric.monitorsMonitorIdMetricsMetricIdPUT(req.swagger.params, res, next);
};

module.exports.monitorsMonitorIdMetricsPOST = function monitorsMonitorIdMetricsPOST (req, res, next) {
  Metric.monitorsMonitorIdMetricsPOST(req.swagger.params, res, next);
};
