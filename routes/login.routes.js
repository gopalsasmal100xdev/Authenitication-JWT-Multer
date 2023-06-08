const express = require("express");
const Router = express.Router();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

Router.route("/")
  .get((req, res) => {
    res.render("login");
  })
  .post((req, res) => {
    const { email, password } = req.body;
    const absPath = path.resolve("database.txt");
    fs.readFile(
      absPath,
      {
        encoding: "utf-8",
      },
      (err, data) => {
        const userList = JSON.parse(data);
        let name = "";
        const result = userList.filter((user) => {
          if (user.email === email && user.password === password) {
            name = user.name;
            return true;
          } else false;
        });
        if (result.length > 0) {
          const accessToken = jwt.sign(
            { email, name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
          );
          req.session.isAuth = true;
          req.session.name = name;
          req.session.accessToken = accessToken;
          res.redirect("/dashboard");
        } else res.redirect("/register");
      }
    );
  });

module.exports = Router;
