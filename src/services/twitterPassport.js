import passport from "passport";
import TwitterStrategy from "passport-twitter";
import "dotenv/config";
//
// T W I T T E R   A U T H E N T I C A T I O N
//
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.use(
  new TwitterStrategy.Strategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:5000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      console.log(token);
      console.log(tokenSecret);
      console.log(profile);
    }
  )
);
