'use strict';

exports.monitorsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "description" : "aeiou",
  "metrics" : [ {
    "name" : "aeiou",
    "interval" : 123456789,
    "retention" : 123456789
  } ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.monitorsMonitorIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitorId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "description" : "aeiou",
  "metrics" : [ {
    "name" : "aeiou",
    "interval" : 123456789,
    "retention" : 123456789
  } ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

