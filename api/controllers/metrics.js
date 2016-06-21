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
var db = {};

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
  if (db.hasOwnProperty(monitorId)) {
    var list = Object.keys(db[monitorId]).map(function (item) {
      return db[monitorId][item];
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
    if (!db.hasOwnProperty(monitorId)) {
      // Build empty metric list
      db[monitorId] = {};
    }
    if (!db[monitorId].hasOwnProperty(metric.name)) {
      db[monitorId][metric.name] = metric;
      res.json(db[monitorId][metric.name]);
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
  if (db.hasOwnProperty(monitorId)) {
    var list = Object.keys(db[monitorId]).map(function (item) {
      return db[monitorId][item];
    });
    delete db[monitorId];
    res.json(list);
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function getMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metricId = req.swagger.params.metricId.value;
  if (db.hasOwnProperty(monitorId)) {
    if (db[monitorId].hasOwnProperty(metricId)) {
      res.json(db[monitorId][metricId]);
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
  if (db.hasOwnProperty(monitorId)) {
    if (db[monitorId].hasOwnProperty(metricId)) {
      var item = db[monitorId][metricId];
      delete db[monitorId][metricId];
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
  if (db.hasOwnProperty(monitorId)) {
    if (db[monitorId].hasOwnProperty(metricId)) {
      if (metricId === metric.name) {
        db[monitorId][metricId] = metric;
        res.json(db[monitorId][metricId]);
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
