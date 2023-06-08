const express = require("express");
const fs = require("fs");
const Router = express.Router();
const isAuth = require("../controllers/isAuth");
const path = require("path");

Router.route("/")
  .get(isAuth, (req, res) => {
    const { name } = req.user;
    fs.readFile(
      path.resolve("database.txt"),
      { encoding: "utf8" },
      (error, data) => {
        if (error) res.redirect("/login");
        let userLists = JSON.parse(data);
        const singleUser = userLists.filter((user) => {
          if (user.name == name) return true;
        })[0];
        const { image } = singleUser;
        res.render("dashboard", { user: { name, image } });
      }
    );
  })
  .post((req, res) => {});

module.exports = Router;
