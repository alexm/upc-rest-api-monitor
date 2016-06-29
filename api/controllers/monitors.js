'use strict';
var util = require('util');
var monitors = require('../helpers/monitors.js');
var errors = require('../helpers/errors.js');
var json2html = require('json-to-html');

module.exports = {
  getMonitorList: getMonitorList,
  getMonitorListAsHtml: getMonitorListAsHtml,
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

function getMonitorListAsHtml(req, res) {
  res.format({
    'text/html': function () {
      res.send(
        "<!DOCTYPE html>\n"
      + "<html><head>\n"
      + "<style type=\"text/css\">.string{color:blue}.number{color:red}</style>\n"
      + "</head><body><h1>Monitors</h1>\n"
      + "<pre>"
      + json2html(monitors.list)
      + "</pre></body></html>"
      );
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
