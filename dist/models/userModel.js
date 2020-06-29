"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;

var validateEmail = function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var userSchema = new Schema({
  googleId: {
    type: "string",
    required: false
  },
  twitterId: {
    type: "string",
    required: false
  },
  name: {
    type: "string",
    required: true //   trim: true,

  },
  email: {
    type: "string",
    required: false,
    lowercase: true //   unique: true,
    //   trim: true,
    //   validate: [validateEmail, "Please fill a valid email address"],
    //   match: [
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //     "Please fill a valid email address",
    //   ],

  },
  password: {
    type: "string",
    required: false
  },
  credits: {
    type: "Number",
    required: false,
    "default": 0
  }
}, {
  timestamps: true
});
var User = model("surveyUser", userSchema);
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=userModel.js.map