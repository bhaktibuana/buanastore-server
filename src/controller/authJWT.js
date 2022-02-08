const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({
      auth: false,
      message: "No token provided.",
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "Failed to authenticate token.",
        });
      } else {
        res.json({
          auth: true,
          user: decoded,
        });
        next();
      }
    });
  }
};

module.exports = { authJWT };
