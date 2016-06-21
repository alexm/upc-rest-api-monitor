'use strict';

/*
 * In memory DB:
 * {
 *   monitor: {
 *     metric: {
 *     }
 *     ...
 *   }
 *   ...
 * }
 */
var db = {
  data: {},

  exists: function (monitor, metric) {
    if (undefined !== metric) {
      return this.data.hasOwnProperty(monitor)
        && this.data[monitor].hasOwnProperty(metric);
    }
    else {
      return this.data.hasOwnProperty(monitor);
    }
  },

  get: function (monitor, metric) {
    return this.data[monitor][metric];
  },

  list: function (monitor) {
    var self = this;
    return Object.keys(this.data[monitor]).map(function (metric) {
      return self.data[monitor][metric];
    });
  },

  put: function (monitor, metric, value) {
    if (!this.exists(monitor)) {
      this.data[monitor] = {};
    }
    this.data[monitor][metric] = value;
  },

  delete: function (monitor, metric) {
    if (undefined !== metric) {
      delete this.data[monitor][metric];
    }
    else {
      delete this.data[monitor];
    }
  },
};

module.exports = db;
