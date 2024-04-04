"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.generateRefreshToken = exports.decodeToken = void 0;
var _config = require("../config");
var jwt = require("jsonwebtoken");
var generateToken = exports.generateToken = function generateToken(user) {
  var payload = {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    id: user._id,
    role: user.roles
  };
  var expiresIn = '24h';
  var token = jwt.sign(payload, _config.SECRET_KEY, {
    expiresIn: expiresIn
  });
  return {
    token: token,
    expiresIn: expiresIn
  };
};
var generateRefreshToken = exports.generateRefreshToken = function generateRefreshToken(user, res) {
  var payload = {
    name: user.firstName,
    lastname: user.lastName,
    email: user.email,
    id: user._id,
    role: user.roles
  };
  var expiresIn = 1000 * 60 * 60 * 24 * 30;
  var refreshToken = jwt.sign(payload, _config.JWT_REFRESH, {
    expiresIn: expiresIn
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !(_config.ENV_UCAR === "development"),
    expires: new Date(Date.now() + expiresIn)
  });
};
var decodeToken = exports.decodeToken = function decodeToken(token) {
  try {
    var payload = jwt.verify(token, _config.SECRET_KEY);
    return payload;
  } catch (err) {
    return null;
  }
};