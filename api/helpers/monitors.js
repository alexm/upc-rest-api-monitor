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
  })
};
