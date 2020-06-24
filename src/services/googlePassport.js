import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import "dotenv/config";

//
// G O O G L E   A U T H E N T I C A T I O N
//
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return cb(err, user);
      });
    }
  )
);
