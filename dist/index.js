"use strict";

require("@babel/polyfill");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _passport = _interopRequireDefault(require("passport"));

require("./services/googlePassport");

require("./services/twitterPassport");

var _googleAuthRoutes = _interopRequireDefault(require("./routes/googleAuthRoutes"));

var _twitterAuthRoutes = _interopRequireDefault(require("./routes/twitterAuthRoutes"));

var _apiRoutes = _interopRequireDefault(require("./routes/apiRoutes"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//
// M o n g o D B   C o n n e c t i o n
//
var connectionURI = process.env.MONGO_URI;
var connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

_mongoose["default"].connect(connectionURI, connectionOptions);

_mongoose["default"].connection.on("error", console.error.bind("MONGO DB Connection Error: "));

_mongoose["default"].connection.on("open", function () {
  console.log("Connection Established with MONGO DB...");
}); //
// E x p r e s s   A P P
//


var app = (0, _express["default"])(); //
// S e s s i o n   &   C o o k i e
//

var SESSION_SECRET = process.env.SESSION_SECRET;
var COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; //
// M i d d l e w a r e
//

app.use((0, _expressSession["default"])({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: COOKIE_MAX_AGE
  }
}), _passport["default"].initialize(), _passport["default"].session(), _express["default"].json()); // Combining multiple app.use middleware statements in a single one.
// app.use(passport.initialize());
// app.use(passport.session());
//
// R o u t e s
//

app.use(_googleAuthRoutes["default"], _twitterAuthRoutes["default"], _apiRoutes["default"]); // Combining multiple app.use statements in a single one.
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

app.get("/", function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, "client", "build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css
  app.use(_express["default"]["static"]("client/build")); // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "client", "build", "index.html"));
  });
}

var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
  console.log("Application is listening at http://localhost:".concat(PORT));
});
//# sourceMappingURL=index.js.map