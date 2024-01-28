"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.decodeToken = void 0;
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
    expiresIn: '24h'
  });
  return token;
};
var decodeToken = exports.decodeToken = function decodeToken(token) {
  try {
    var payload = jwt.verify(token, _config.SECRET_KEY);
    return payload;
  } catch (err) {
    return null;
  }
};
var _default = exports["default"] = generateToken;