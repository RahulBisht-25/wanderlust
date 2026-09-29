const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapasync.js");
const { saveredirectUrl, isloggedin } = require("../middleware.js");

const Usercontroller = require("../controllers/user.js");

router
.route("/signup")
.get(Usercontroller.rendersignupform)
.post(wrapAsync(Usercontroller.signup));

router.route("/login")
.get(Usercontroller.renderloginform)
.post( saveredirectUrl, passport.authenticate("local", 
  { failureFlash: true, failureRedirect: "/login" }),Usercontroller.login);

router.get("/logout",Usercontroller.logout);

module.exports = router;