'use strict';
var monitors = {
  "memory": {
    "name": "memory",
    "description": "Memory metrics",
    "metrics": [
      {
        "name": "freemem",
        "interval": 60*5,
        "retention": 60*60*24
      },
      {
        "name": "totalmem",
        "interval": 60*60*24,
        "retention": 60*60*24*30
      }
    ]
  }
};

module.exports = {
  monitors: monitors,
  list: Object.keys(monitors).map(function (item) {
    return monitors[item];
  }),
  valid: function (metric) {
    return 3 === Object.keys(metric).length
      && metric.hasOwnProperty('name')
      && metric.hasOwnProperty('interval')
      && metric.hasOwnProperty('retention')
      && 'string' === typeof(metric.name)
      && 'number' === typeof(metric.interval)
      && 'number' === typeof(metric.retention)
      && metric.interval  > 0
      && metric.retention > 0
  },
};
