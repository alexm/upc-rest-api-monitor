'use strict';

var url = require('url');


var DataSet = require('./DataSetService');


module.exports.datasetsGET = function datasetsGET (req, res, next) {
  DataSet.datasetsGET(req.swagger.params, res, next);
};
