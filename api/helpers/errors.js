'use strict';
var errors = {
  OK: {
    code: 200,
    message: "OK",
  },
  not_found: {
    code: 404,
    message: "Not Found",
  },
  conflict: {
    code: 409,
    message: "Conflict",
  },
};

module.exports = errors;
