"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/auth/twitter/", _passport["default"].authenticate("twitter"));
router.get("/auth/twitter/callback", _passport["default"].authenticate("twitter", {
  failureRedirect: "/login"
}), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect("/api/currentuser");
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=twitterAuthRoutes.js.map