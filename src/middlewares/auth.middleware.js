const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return next({
        status: 401,
        name: "no token",
        message: "Token is not present on request headers",
      });
    }

    const decoded = jwt.verify(token, "parangaricutirimucuaro", {
      algorithms: "HS512",
    });
    req.user = decoded;
    next();
  } catch (error) {
    next({
      status: 498,
      name: "invalid or expired token",
      message: error,
    });
  }
};

module.exports = authenticate;
