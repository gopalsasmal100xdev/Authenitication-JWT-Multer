const express = require("express");
const multer = require("multer");
const fs = require("fs");
const isAuth = require("../controllers/isAuth");
const path = require("path");

const Router = express.Router();

const storageOptions = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const fileExt = file.mimetype.split("/")[1];
    const filename = `${Date.now()}.${fileExt}`;
    req.imageUrl = filename;
    cb(null, filename);
  },
});
const upload = multer({ storage: storageOptions });

Router.route("/")
  .get(isAuth, (req, res) => {
    res.render("upload");
  })
  .post(isAuth, upload.single("image"), (req, res) => {
    let userLists = [];
    const absolutePath = path.resolve("database.txt");
    fs.readFile(absolutePath, { encoding: "utf8" }, (error, data) => {
      if (error) res.redirect("/upload");
      userLists = JSON.parse(data);
      userLists = userLists.filter((user) => {
        if (user.name == req.session.name) {
          user.image = req.imageUrl;
          return true;
        }
        return true;
      });
      fs.writeFile(absolutePath, JSON.stringify(userLists), (err) => {
        if (err) res.redirect("/upload");
        else res.redirect("/dashboard");
      });
    });
  });

module.exports = Router;
