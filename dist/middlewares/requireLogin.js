"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(req, res, next) {
  if (!req.user) return res.status(401).send({
    error: "You must login."
  });
  next();
};

exports["default"] = _default;
//# sourceMappingURL=requireLogin.js.map