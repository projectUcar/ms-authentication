"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _config = require("../config");
var jwt = require('jsonwebtoken');
var generateToken = function generateToken(user) {
  var payload = {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    role: user.roles
  };
  var token = jwt.sign(payload, _config.SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};
var _default = exports["default"] = generateToken;