"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET_KEY = exports.PORT = exports.MONGODB_URI = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MONGODB_URI = exports.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UcarDB";
var PORT = exports.PORT = process.env.PORT || 4000;
var SECRET_KEY = exports.SECRET_KEY = process.env.SECRET;