"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportTwitter = _interopRequireDefault(require("passport-twitter"));

require("dotenv/config");

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// T W I T T E R   A U T H E N T I C A T I O N
//
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

_passport["default"].serializeUser(function (user, cb) {
  cb(null, user.id);
});

_passport["default"].deserializeUser(function (id, cb) {
  _userModel["default"].findById(id).then(function (user) {
    cb(null, user);
  });
});

_passport["default"].use(new _passportTwitter["default"].Strategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "/auth/twitter/callback",
  proxy: true
}, function (token, tokenSecret, profile, cb) {
  _userModel["default"].findOne({
    twitterId: profile.id
  }).then(function (existingUser) {
    if (existingUser) return cb(null, existingUser);
    var newUser = new _userModel["default"]({
      twitterId: profile.id,
      name: profile.displayName,
      email: "@" + profile.username
    });
    newUser.save().then(function (newUser) {
      return cb(null, newUser);
    });
  });
}));
//# sourceMappingURL=twitterPassport.js.map