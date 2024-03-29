const express = require("express");
const router = express.Router();
const passport = require("passport");

// The root route renders our only view
router.get("/", function (req, res, next) {
  res.redirect("/catchlog");
  //UPDATE THIS
  // Where do you want to go for the root route
  // in the student demo this was res.redirect('/movies'), what do you want?
  // This could be a landing page, or just redirect to your main resource page which you'll have an a tag that makes
  // a request to `/auth/google` route below
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/catchlog", // UPDATE THIS, where do you want the client to go after you login
    failureRedirect: "/catchlog", //  UPDATE THIS, where do you want the client to go if login fails
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect("/catchlog"); // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  });
});

module.exports = router;
