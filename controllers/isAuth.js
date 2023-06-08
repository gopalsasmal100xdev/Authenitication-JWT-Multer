const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
  try {
    const token = req.session.accessToken;
    const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (req.session.isAuth && result) {
      req.user = result;
      next();
    } else res.redirect("/login");
  } catch (e) {
    res.redirect("/login");
  }
}
module.exports = isAuth;
