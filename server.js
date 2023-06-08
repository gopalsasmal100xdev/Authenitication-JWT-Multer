const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const app = express();
const Login = require("./routes/login.routes");
const Register = require("./routes/register.routes");
const Dashboard = require("./routes/dashboard.routes");
const Upload = require("./routes/upload.routes");
const Logout = require("./routes/logout.routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "KSFLAKSJDASKDJewporm,dfas203-ra;fds230ri-a;f",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use("/login", Login);
app.use("/register", Register);
app.use("/dashboard", Dashboard);
app.use("/upload", Upload);
app.use("/logout", Logout);

app.get("/", (req, res) => {
  res.render("home");
});

/*
app.get("/posts", authenticateToke, (req, res) => {
  res.json(posts.filter((post) => post.name === req.user.name));
});

function authenticateToke(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/login", (req, res) => {
  const userName = req.body.username;
  const user = { name: userName };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});
*/

app.listen(PORT, (err) => {
  console.log(`Server connected on port http://localhost:${PORT}`);
});
