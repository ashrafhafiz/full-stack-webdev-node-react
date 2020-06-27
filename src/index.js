import express from "express";
import session from "express-session";
import "dotenv/config";
import passport from "passport";
import "./services/googlePassport";
import "./services/twitterPassport";
import googleAuthRouters from "./routes/googleAuthRoutes";
import twitterAuthRouters from "./routes/twitterAuthRoutes";
import mongoose from "mongoose";

//
// M o n g o D B   C o n n e c t i o n
//
const connectionURI = process.env.MONGO_URI;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.connect(connectionURI, connectionOptions);
mongoose.connection.on(
  "error",
  console.error.bind("MONGO DB Connection Error: ")
);
mongoose.connection.on("open", () => {
  console.log("Connection Established with MONGO DB...");
});

//
// E x p r e s s   A P P
//
const app = express();

//
// S e s s i o n   &   C o o k i e
//
const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_MAX_AGE },
  }),
  passport.initialize(),
  passport.session()
);
// Combining multiple app.use statements in a single one.
// app.use(passport.initialize());
// app.use(passport.session());

//
// R o u t e s
//
app.use(googleAuthRouters, twitterAuthRouters);
// Combining multiple app.use statements in a single one.
// app.use(googleAuthRouters);
// app.use(twitterAuthRouters);

// Defining CORS
// app.use(function (req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.get("/", (req, res) => {
  res.send({ Hi: "There to main screen." });
});
//
app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/currentuser", (req, res) => {
  // console.log(req);
  // res.send(req.session);
  res.send(req.user);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`);
});
