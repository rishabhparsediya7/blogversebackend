const jwt = require("jsonwebtoken");
const HttpError = require("./httperror");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token || token === "null") {
      return res.status(400).json({ message: "Access token is not present" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (decodedToken) {
      next();
    } else {
      return res.status(403).json({ message: "Authentication failed" });
    }
  } catch (e) {
    return res.status(403).json({ message: "Authentication failed" });
  }
};
