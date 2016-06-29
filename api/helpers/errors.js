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
  bad_request: {
    code: 400,
    message: "Bad Request",
  },
  not_acceptable: {
    code: 406,
    message: "Not Acceptable",
  },
};

module.exports = errors;
