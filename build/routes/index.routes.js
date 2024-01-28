"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _package = _interopRequireDefault(require("../../package.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.get("/", function (req, res) {
  res.json({
    message: "Welcome to my Products API",
    name: _package["default"].name,
    version: _package["default"].version,
    description: _package["default"].description,
    author: _package["default"].author
  });
});
var _default = exports["default"] = router;