"use strict";

var _app = _interopRequireDefault(require("./app"));
var _config = require("./config.js");
require("./database");
require("./libs/initialSetup.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_config.PORT);
console.log('Server listening on port', _config.PORT);