"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authJwt = require("../middlewares/authJwt");
var _multerConfig = _interopRequireDefault(require("../libs/multerConfig"));
var _profileImage = require("../controllers/profileImage.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.post("/upload-profile-image", _authJwt.authenticateUser, _multerConfig["default"].single("photoUrl"), _profileImage.uploadProfileImage);
router.get('/profile-image', _authJwt.authenticateUser, _profileImage.getProfileImage);
var _default = exports["default"] = router;