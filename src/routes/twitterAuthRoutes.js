import passport from "passport";
import express from "express";
const router = express.Router();

router.get("/auth/twitter/", passport.authenticate("twitter"));

router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/currentuser");
  }
);

export default router;
