'use strict';

exports.datasetsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * monitor (String)
  * metric (String)
  * begin (Long)
  * end (Long)
  * limit (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "filter" : {
    "metric" : "aeiou",
    "limit" : 123456789,
    "monitor" : "aeiou",
    "end" : 123456789,
    "begin" : 123456789
  },
  "values" : [ {
    "metric" : "aeiou",
    "monitor" : "aeiou",
    "value" : 1.3579000000000001069366817318950779736042022705078125,
    "timestamp" : 123456789
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

