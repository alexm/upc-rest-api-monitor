'use strict';

/*
 * In memory DB:
 * {
 *   monitor: {
 *     metric: {
 *       timestamp: value,
 *     }
 *     ...
 *   }
 *   ...
 * }
 */
var datasets = {
  data: {},
  interval: {},
  retention: {},

  exists: function (monitor, metric) {
    if (undefined !== metric) {
      return this.data.hasOwnProperty(monitor)
        && this.data[monitor].hasOwnProperty(metric);
    }
    else {
      return this.data.hasOwnProperty(monitor);
    }
  },

  find: function (monitor, metric, begin, end, limit) {
    var values;
    if (!this.data.hasOwnProperty(monitor) || !this.data[monitor].hasOwnProperty(metric)) {
      values = [];
    }
    else {
      var self = this;
      var timestamps = Object.keys(this.data[monitor][metric]).filter(function (timestamp) {
        var num = Number(timestamp);
        return begin <= num && num <= end;
      }).slice(0, limit);
      values = timestamps.map(function (timestamp) {
        return {
          monitor: monitor,
          metric: metric,
          timestamp: Number(timestamp),
          value: self.data[monitor][metric][timestamp]
        }
      });
    }
    return {
      filter: {
        monitor: monitor,
        metric: metric,
        begin: begin,
        end: end,
        limit: limit
      },
      values: values
    };
  },

  start: function (monitor, metric, interval, retention) {
    if (!this.exists(monitor)) {
      this.data[monitor] = {};
      this.interval[monitor] = {};
      this.retention[monitor] = {};
    }
    if (!this.exists(monitor, metric)) {
      this.data[monitor][metric] = {};
      this.retention[monitor][metric] = {};
    }

    var self = this;
    self.interval[monitor][metric] = setInterval(function () {
      var now = Date.now();
      var value = 123;
      self.data[monitor][metric][now] = value;
      console.log("+ [" + monitor + "][" + metric + "][" + now + "]=" + value);

      self.retention[monitor][metric][now] = setTimeout(function () {
        console.log("- [" + monitor + "][" + metric + "][" + now + "]=" + value);
        delete self.data[monitor][metric][now];
        delete self.retention[monitor][metric][now];
      }, retention);

    }, interval);
  },

  stop: function (monitor, metric) {
      clearInterval(this.interval[monitor][metric]);
  },

  delete: function (monitor, metric) {
    if (undefined !== metric) {
      this.stop(monitor, metric);
      delete this.retention[monitor][metric];
      delete this.interval[monitor][metric];
      delete this.data[monitor][metric];
    }
    else {
      delete this.retention[monitor];
      delete this.interval[monitor];
      delete this.data[monitor];
    }
  },
};

module.exports = datasets;
