"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET_KEY = exports.SECRET_ID = exports.PORT = exports.PASSWORD_EMAIL = exports.MONGODB_URI = exports.LOCAL_HOST_BASE_URL = exports.LENGTH_PASSWORD = exports.FRONTEND_BASE_URL = exports.EMAIL_UCAR = exports.CLIENT_ID = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI;
var PORT = exports.PORT = process.env.PORT || 4000;
var SECRET_KEY = exports.SECRET_KEY = process.env.SECRET;
var LENGTH_PASSWORD = exports.LENGTH_PASSWORD = 8;
var LOCAL_HOST_BASE_URL = exports.LOCAL_HOST_BASE_URL = process.env.LOCAL_HOST_BASE_URL;
var FRONTEND_BASE_URL = exports.FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
var PASSWORD_EMAIL = exports.PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
var EMAIL_UCAR = exports.EMAIL_UCAR = process.env.EMAIL_UCAR;
var CLIENT_ID = exports.CLIENT_ID = process.env.CLIENT_ID;
var SECRET_ID = exports.SECRET_ID = process.env.SECRET_ID;