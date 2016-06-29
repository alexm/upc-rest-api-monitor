'use strict';
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
  res.format({
    'application/json': function () {
      var monitorId = req.swagger.params.monitorId.value;
      if (db.exists(monitorId)) {
        res.json(db.list(monitorId));
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

function enableMetric(req, res) {
  res.format({
    'application/json': function () {
      var monitorId = req.swagger.params.monitorId.value;
      var metric = req.swagger.params.metric.value;
      if (monitors.monitors.hasOwnProperty(monitorId)) {
        if (!db.exists(monitorId, metric.name)) {
          if (monitors.valid(metric)) {
            db.put(monitorId, metric.name, metric);
            res.json(db.get(monitorId, metric.name));
          }
          else {
            res.status(400).json(errors.bad_request);
          }
        }
        else {
          // Already enabled
          res.status(409).json(errors.conflict);
        }
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

function disableMonitor(req, res) {
  res.format({
    'application/json': function () {
      var monitorId = req.swagger.params.monitorId.value;
      if (db.exists(monitorId)) {
        var list = db.list(monitorId);
        db.delete(monitorId);
        res.json(list);
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

function getMetric(req, res) {
  res.format({
    'application/json': function () {
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
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}

function disableMetric(req, res) {
  res.format({
    'application/json': function () {
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
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}

function updateMetric(req, res) {
  res.format({
    'application/json': function () {
      var monitorId = req.swagger.params.monitorId.value;
      var metricId = req.swagger.params.metricId.value;
      var metric = req.swagger.params.metric.value;
      if (db.exists(monitorId)) {
        if (db.exists(monitorId, metricId)) {
          if (metricId === metric.name) {
            if (monitors.valid(metric)) {
              db.put(monitorId, metricId, metric);
              res.json(db.get(monitorId, metricId));
            }
            else {
              res.status(400).json(errors.bad_request);
            }
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
    },
    'default': function () {
      res.status(406).json(errors.not_acceptable);
    },
  });
}
