'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');
var errors = require('../helpers/errors.js');

/*
 * In memory DB:
 * {
 *   monitor1: {
 *     metric1: {
 *       name: string
 *       interval: number
 *       retention: number
 *     }
 *     ...
 *   }
 *   ...
 * }
 */
var metrics = {};

module.exports = {
  getMetricList: getMetricList,
  enableMetric: enableMetric,
  disableMonitor: disableMonitor,
  getMetric: getMetric,
  disableMetric: disableMetric,
  updateMetric: updateMetric,
};

function getMetricList(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  if (metrics.hasOwnProperty(monitorId)) {
    var list = Object.keys(metrics[monitorId]).map(function (item) {
      return metrics[monitorId][item];
    });
    res.json(list);
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function enableMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metric = req.swagger.params.metric.value;
  if (monitors.monitors.hasOwnProperty(monitorId)) {
    if (!metrics.hasOwnProperty(monitorId)) {
      // Build empty metric list
      metrics[monitorId] = {};
    }
    if (!metrics[monitorId].hasOwnProperty(metric.name)) {
      metrics[monitorId][metric.name] = metric;
      res.json(metrics[monitorId][metric.name]);
    }
    else {
      // Already enabled
      res.status(409).json(errors.conflict);
    }
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function disableMonitor(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  if (metrics.hasOwnProperty(monitorId)) {
    var list = Object.keys(metrics[monitorId]).map(function (item) {
      return metrics[monitorId][item];
    });
    delete metrics[monitorId];
    res.json(list);
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function getMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metricId = req.swagger.params.metricId.value;
  if (metrics.hasOwnProperty(monitorId)) {
    if (metrics[monitorId].hasOwnProperty(metricId)) {
      res.json(metrics[monitorId][metricId]);
    }
    else {
      res.status(404).json(errors.not_found);
    }
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function disableMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metricId = req.swagger.params.metricId.value;
  if (metrics.hasOwnProperty(monitorId)) {
    if (metrics[monitorId].hasOwnProperty(metricId)) {
      var item = metrics[monitorId][metricId];
      delete metrics[monitorId][metricId];
      res.json(item);
    }
    else {
      res.status(404).json(errors.not_found);
    }
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function updateMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metricId = req.swagger.params.metricId.value;
  var metric = req.swagger.params.metric.value;
  if (metrics.hasOwnProperty(monitorId)) {
    if (metrics[monitorId].hasOwnProperty(metricId)) {
      if (metricId === metric.name) {
        metrics[monitorId][metricId] = metric;
        res.json(metrics[monitorId][metricId]);
      }
      else {
        res.status(409).json(errors.conflict);
      }
    }
    else {
      res.status(404).json(errors.not_found);
    }
  }
  else {
    res.status(404).json(errors.not_found);
  }
}
