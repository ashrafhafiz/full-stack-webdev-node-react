import mongoose from "mongoose";
const { Schema, model } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    googleId: {
      type: "string",
      required: false,
    },
    twitterId: {
      type: "string",
      required: false,
    },
    name: {
      type: "string",
      required: true,
      //   trim: true,
    },
    email: {
      type: "string",
      required: false,
      lowercase: true,
      //   unique: true,
      //   trim: true,
      //   validate: [validateEmail, "Please fill a valid email address"],
      //   match: [
      //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //     "Please fill a valid email address",
      //   ],
    },
    password: {
      type: "string",
      required: false,
    },
  },
  { timestamps: true }
);

const User = model("surveyUser", userSchema);

export default User;
