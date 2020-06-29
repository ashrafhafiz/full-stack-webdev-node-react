"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/auth/google/", _passport["default"].authenticate("google", {
  scope: ["profile", "email"]
}));
router.get("/auth/google/callback", _passport["default"].authenticate("google", {
  failureRedirect: "/"
}), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect("/surveys");
});
var _default = router; // https://accounts.google.com/signin/oauth/oauthchooseaccount?response_type=code
// & redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback
// & scope=profile%20email
// & client_id=135408044096-i7tc05nbm4fj2pho9lfm6iin74p7u74a.apps.googleusercontent.com
// & o2v=2
// & as=QW6J_S8o317YOsyVa4GgJw
// & flowName=GeneralOAuthFlow

exports["default"] = _default;
//# sourceMappingURL=googleAuthRoutes.js.map