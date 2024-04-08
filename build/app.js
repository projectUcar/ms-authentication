"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _helmet = _interopRequireDefault(require("helmet"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _indexRoutes = _interopRequireDefault(require("./routes/index.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _forgotPasswordRoutes = _interopRequireDefault(require("./routes/forgotPassword.routes.js"));
var _profileImageRoutes = _interopRequireDefault(require("./routes/profileImage.routes.js"));
var _ratingRoutes = _interopRequireDefault(require("./routes/rating.routes.js"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set('pkg', _package["default"]);
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"]("images"));
app.set("json spaces", 4);
app.use('/api', _indexRoutes["default"]);
app.use("/api/user", _userRoutes["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/auth', _forgotPasswordRoutes["default"]);
app.use('/api/user', _profileImageRoutes["default"]);
app.use('/api/rating', _ratingRoutes["default"]);
var _default = exports["default"] = app;