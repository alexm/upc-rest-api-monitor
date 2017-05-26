'use strict';
var monitors = require('../helpers/monitors.js');
var errors = require('../helpers/errors.js');
var metrics = require('../helpers/metrics.js');
var datasets = require('../helpers/datasets.js');

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
      if (metrics.exists(monitorId)) {
        res.json(metrics.list(monitorId));
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
        if (!metrics.exists(monitorId, metric.name)) {
          if (monitors.valid(metric)) {
            metrics.put(monitorId, metric.name, metric);
            datasets.start(monitorId, metric.name, metric.interval, metric.retention);
            res.json(metrics.get(monitorId, metric.name));
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
      if (metrics.exists(monitorId)) {
        var list = metrics.list(monitorId);
        metrics.delete(monitorId);
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
      if (metrics.exists(monitorId)) {
        if (metrics.exists(monitorId, metricId)) {
          res.json(metrics.get(monitorId, metricId));
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
      if (metrics.exists(monitorId)) {
        if (metrics.exists(monitorId, metricId)) {
          var item = metrics.get(monitorId, metricId);
          metrics.delete(monitorId, metricId);
          datasets.stop(monitorId, metricId);
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
      if (metrics.exists(monitorId)) {
        if (metrics.exists(monitorId, metricId)) {
          if (metricId === metric.name) {
            if (monitors.valid(metric)) {
              metrics.put(monitorId, metricId, metric);
              res.json(metrics.get(monitorId, metricId));
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
