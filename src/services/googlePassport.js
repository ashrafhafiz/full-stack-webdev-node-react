import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import User from "../models/userModel";

//
// G O O G L E   A U T H E N T I C A T I O N
//
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) return cb(null, existingUser);
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        newUser.save().then((newUser) => cb(null, newUser));
      });
      // User.findOrCreate({ googleId: profile.id }, (err, user) => {
      //   return cb(err, user);
      // });
    }
  )
);
