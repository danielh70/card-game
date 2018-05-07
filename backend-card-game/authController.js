const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = 'secrettt';

module.exports.register = async (req, res, next) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({
      userInfo: user,
      token: token
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports.login = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(401).json(err);
      return;
    }

    if (user) {
      const token = user.generateJwt();
      res.status(200).json({
        userInfo: user,
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.fbAuth = (req, res, next) => {
  passport.authenticate("facebook", {
    state: req.query.linkinguri
  })(req, res, next);
};

module.exports.fbAuthCB = (req, res, next) => {
  passport.authenticate("facebook", (err, user, info) =>
    generateTokenAndRedirect(req, res, next, err, user, info)
  )(req, res, next);
};

module.exports.goAuth = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.linkinguri
  })(req, res, next);
};

module.exports.goAuthCB = (req, res, next) => {
  passport.authenticate("google", (err, user, info) =>
    generateTokenAndRedirect(req, res, next, err, user, info)
  )(req, res, next);
};

const generateTokenAndRedirect = (req, res, next, err, user, info) => {
  if (err) {
    return next(err);
  }
  if (user) {
    const token = user.generateJwt();
    return res.redirect(`${req.query.state}?token=${token}`);
  } else {
    return res.redirect("${req.query.state}");
  }
};