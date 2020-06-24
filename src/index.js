import express from "express";
import session from "express-session";
import "dotenv/config";
import passport from "passport";
import "./services/googlePassport";
import "./services/twitterPassport";
import googleAuthRouters from "./routes/googleAuthRoutes";
import twitterAuthRouters from "./routes/twitterAuthRoutes";
import mongoose from "mongoose";

// MongoDB connection
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

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//
// R o u t e s
//
app.use(googleAuthRouters);
app.use(twitterAuthRouters);
app.get("/", (req, res) => {
  res.send({ Hi: "There" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`);
});
