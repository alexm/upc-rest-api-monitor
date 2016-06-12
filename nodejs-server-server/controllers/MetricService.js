'use strict';

exports.monitorsMonitorIdMetricsDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdMetricsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdMetricsMetricIdDELETE = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  * metricId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdMetricsMetricIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  * metricId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdMetricsMetricIdPUT = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  * metricId (String)
  * metric (List)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdMetricsPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  * metric (Metric)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "interval" : 123456789,
  "retention" : 123456789
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

