import express from "express";
import passport from "passport";

const router = express.Router();

//auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

//auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//auth w/ google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

export default router;
