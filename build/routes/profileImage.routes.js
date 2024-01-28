"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _authJwt = require("../middlewares/authJwt");
var _fs = _interopRequireDefault(require("fs"));
var _shortid = _interopRequireDefault(require("shortid"));
var _crypto = _interopRequireDefault(require("crypto"));
var _multerConf = _interopRequireDefault(require("../libs/multerConf"));
var _profileImage = require("../controllers/profileImage.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    var uploadPath = 'uploads/profileImage';

    // Verifica si la carpeta de destino existe, si no, créala
    if (!_fs["default"].existsSync(uploadPath)) {
      _fs["default"].mkdirSync(uploadPath, {
        recursive: true
      });
    }
    callback(null, uploadPath);
  },
  filename: function filename(req, file, callback) {
    var userId = req.user.id;
    var fileExtension = file.originalname.split('.').pop();
    var newFileName = "".concat(_shortid["default"].generate(), ".").concat(fileExtension);
    callback(null, newFileName);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});
//const upload = multer(multerConfig);

router.post("/upload-profile-image", _authJwt.authenticateUser, upload.single("photoUrl"), _profileImage.uploadProfileImage);
router.get('/profile-image', _authJwt.authenticateUser, _profileImage.getProfileImage);
var _default = exports["default"] = router;