import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";
import User from "../models/userModel";

//
// G O O G L E   A U T H E N T I C A T I O N
// Code have be refactored to ES7 async/await
//
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return cb(null, existingUser);
      const newUser = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      cb(null, newUser);

      // User.findOrCreate({ googleId: profile.id }, (err, user) => {
      //   return cb(err, user);
      // });
    }
  )
);
