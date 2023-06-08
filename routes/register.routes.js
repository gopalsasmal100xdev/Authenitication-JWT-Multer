const express = require("express");
const fs = require("fs");
const Router = express.Router();
const path = require("path");

Router.route("/")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    const absPath = path.resolve("database.txt");
    const { name, email, password } = req.body;
    let userList = [];
    const user = {
      id: Date.now(),
      name,
      email,
      password,
    };
    fs.readFile(
      absPath,
      {
        encoding: "utf8",
        flag: "r",
      },
      (error, result) => {
        if (error) console.log(`Error: ${error}`);
        if (result == "") userList = [];
        else {
          userList = JSON.parse(result);
          userList.push(user);
          fs.writeFile(absPath, JSON.stringify(userList), (err) => {
            if (err) res.render("register");
            else {
              console.log(`Data saved`);
              res.redirect("/login");
            }
          });
        }
      }
    );
  });

module.exports = Router;
