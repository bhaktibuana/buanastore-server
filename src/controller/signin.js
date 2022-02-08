const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const db = require("../config/dbConnection");

const signin = (req, res) => {
  const email = req.body.email;
  const password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const selectQuery = `SELECT * FROM user WHERE email = ? AND password = ?;`;
  db.query(selectQuery, [email, password], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      if (result.length === 0) {
        res.json({
          auth: false,
          message: "Wrong email or password.",
        });
      } else {
        if (result[0]["is_verified"] === 0) {
          res.json({
            auth: false,
            message: "Please verify your account.",
          });
        } else {
          const token = jwt.sign(
            {
              id: result[0]["id"],
              first_name: result[0]["first_name"],
              last_name: result[0]["last_name"],
              email: result[0]["email"],
            },
            process.env.JWT_SECRET_KEY
          );

          res.json({
            auth: true,
            token: token,
          });
        }
      }
    }
  });
};

module.exports = { signin };
