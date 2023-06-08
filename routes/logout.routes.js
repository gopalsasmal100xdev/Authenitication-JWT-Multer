const express = require("express");
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  })
  .post((req, res) => {});

module.exports = Router;
