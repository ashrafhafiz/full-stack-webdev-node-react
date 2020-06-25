import passport from "passport";
import TwitterStrategy from "passport-twitter";
import "dotenv/config";
import User from "../models/userModel";

//
// T W I T T E R   A U T H E N T I C A T I O N
//
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});

passport.use(
  new TwitterStrategy.Strategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
      proxy: true,
    },
    (token, tokenSecret, profile, cb) => {
      User.findOne({ twitterId: profile.id }).then((existingUser) => {
        if (existingUser) return cb(null, existingUser);
        const newUser = new User({
          twitterId: profile.id,
          name: profile.displayName,
          email: "@" + profile.username,
        });
        newUser.save().then((newUser) => cb(null, newUser));
      });
    }
  )
);
