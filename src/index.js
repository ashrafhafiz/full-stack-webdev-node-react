import express from "express";
import session from "express-session";
import "dotenv/config";
import path from "path";
import passport from "passport";
import "./services/googlePassport";
import "./services/twitterPassport";
import googleAuthRouters from "./routes/googleAuthRoutes";
import twitterAuthRouters from "./routes/twitterAuthRoutes";
import apiRoutes from "./routes/apiRoutes";
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

//
// M i d d l e w a r e
//
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_MAX_AGE },
  }),
  passport.initialize(),
  passport.session(),
  express.json()
);
// Combining multiple app.use middleware statements in a single one.
// app.use(passport.initialize());
// app.use(passport.session());

//
// R o u t e s
//
app.use(googleAuthRouters, twitterAuthRouters, apiRoutes);
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

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`);
});
