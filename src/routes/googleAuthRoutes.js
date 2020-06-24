import passport from "passport";
import express from "express";
const router = express.Router();

router.get(
  "/auth/google/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// https://accounts.google.com/signin/oauth/oauthchooseaccount?response_type=code
// & redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback
// & scope=profile%20email
// & client_id=135408044096-i7tc05nbm4fj2pho9lfm6iin74p7u74a.apps.googleusercontent.com
// & o2v=2
// & as=QW6J_S8o317YOsyVa4GgJw
// & flowName=GeneralOAuthFlow
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default router;
