const jwt = require("jsonwebtoken");
const db = require("../config/dbConnection");

const accountVerify = (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        auth: false,
        message: "Failed to verify.",
      });
    } else {
      const verifyCheckQuery = `SELECT is_verified FROM user WHERE email = ?;`;

      db.query(verifyCheckQuery, [decoded.email], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          if (result[0]["is_verified"] === 1) {
            res.json({
              auth: true,
              message: "Account is already verified.",
            });
          } else {
            const updateQuery = `UPDATE user SET is_verified = true, updated_at = NOW() WHERE email = ?;`;

            db.query(updateQuery, [decoded.email], (err, result) => {
              if (err) {
                res.json(err);
              } else {
                res.json({
                  auth: true,
                  message: "Account verification success.",
                });
              }
            });
          }
        }
      });
    }
  });
};

module.exports = { accountVerify };