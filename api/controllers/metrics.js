'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');
var errors = require('../helpers/errors.js');
var db = require('../helpers/db.js');

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
  if (db.exists(monitorId)) {
    res.json(db.list(monitorId));
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function enableMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metric = req.swagger.params.metric.value;
  if (monitors.monitors.hasOwnProperty(monitorId)) {
    if (!db.exists(monitorId, metric.name)) {
      db.put(monitorId, metric.name, metric);
      res.json(db.get(monitorId, metric.name));
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
  if (db.exists(monitorId)) {
    var list = db.list(monitorId);
    db.delete(monitorId);
    res.json(list);
  }
  else {
    res.status(404).json(errors.not_found);
  }
}

function getMetric(req, res) {
  var monitorId = req.swagger.params.monitorId.value;
  var metricId = req.swagger.params.metricId.value;
  if (db.exists(monitorId)) {
    if (db.exists(monitorId, metricId)) {
      res.json(db.get(monitorId, metricId));
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
  if (db.exists(monitorId)) {
    if (db.exists(monitorId, metricId)) {
      var item = db.get(monitorId, metricId);
      db.delete(monitorId, metricId);
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
  if (db.exists(monitorId)) {
    if (db.exists(monitorId, metricId)) {
      if (metricId === metric.name) {
        db.put(monitorId, metricId, metric);
        res.json(db.get(monitorId, metricId));
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
