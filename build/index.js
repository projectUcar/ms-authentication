"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
require("./libs/initialSetup.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(4000);
console.log('Server listening on port', 4000);
_app["default"].set("json spaces", 4);