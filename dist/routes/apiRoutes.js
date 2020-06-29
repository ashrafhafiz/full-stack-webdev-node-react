"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _requireLogin = _interopRequireDefault(require("../middlewares/requireLogin"));

var _express = _interopRequireDefault(require("express"));

var _stripe = _interopRequireDefault(require("stripe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

var stripe = (0, _stripe["default"])(process.env.STRIPE_SECRET_KEY);
router.get("/api/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
router.get("/api/currentuser", function (req, res) {
  // console.log(req);
  // res.send(req.session);
  res.send(req.user);
});
router.post("/api/stripe", _requireLogin["default"], /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var charge, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stripe.charges.create({
              amount: 500,
              currency: "usd",
              source: req.body.id,
              description: "$5 for 5 Credits"
            });

          case 2:
            charge = _context.sent;
            req.user.credits += 5;
            _context.next = 6;
            return req.user.save();

          case 6:
            user = _context.sent;
            res.send(user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=apiRoutes.js.map