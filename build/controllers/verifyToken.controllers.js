"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = void 0;
var validateToken = exports.validateToken = function validateToken(req, res) {
  try {
    res.status(200).json({
      authenticated: true,
      userId: req.user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
};