const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { db } = require("./services/dbConnection");
const { sendConfirmationEmail } = require("./services/emailServices");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

// get count of all products
app.get("/get/product-count", (req, res) => {
  const dbQuery = `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code`;
  db.query(dbQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get 10 product list for product thumbnail card
app.get("/get/product-thumbnail/:index", (req, res) => {
  const index = parseInt(req.params.index);

  const dbQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(dbQuery, [index], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get count of products with category
app.get("/get/product-count-category", (req, res) => {
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const dbQuery =
    paramsArrLen > 1
      ? `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1);`
      : `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0);`;
  db.query(dbQuery, [paramsArr], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get 10 product list for product thumbnail with category
app.get("/get/product-thumbnail-category/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const dbQuery =
    paramsArrLen > 1
      ? `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1) ORDER BY p.id ASC LIMIT ?, 10;`
      : `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0) ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(dbQuery, [paramsArr, index], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get product detail for product modal
app.get("/get/product-detail", (req, res) => {
  const code = req.query.code;

  const dbQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value, p.description FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE pc.code = ?;`;
  db.query(dbQuery, [code], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// insert new user for signup
app.post("/post/user-signup", (req, res) => {
  const userObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex"),
  };

  const dbIsUserExistQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ?`;
  db.query(dbIsUserExistQuery, [userObj.email], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      if (result[0]["count"] === 1) {
        res.json({ message: "User already exist! Use another email." });
      } else {
        sendConfirmationEmail(userObj)
          .then((result) => {
            const dbQuery = `INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?);`;

            db.query(
              dbQuery,
              [
                userObj.firstName,
                userObj.lastName,
                userObj.email,
                userObj.password,
              ],
              (err, result) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  res.json({
                    message:
                      "Registration success! Please check your email and verify your account.",
                  });
                }
              }
            );
          })
          .catch((error) =>
            res.json({
              message:
                "Oops, there is a little technical problem. Please try again later.",
            })
          );
      }
    }
  });
});

// verify user email
app.get("/get/user-verify", (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.json({
        auth: false,
        message: "Failed to verify.",
      });
    } else {
      const dbVerifyCheckQuery = `SELECT is_verified FROM user WHERE email = ?`;

      db.query(dbVerifyCheckQuery, [decoded.email], (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          if (result[0]["is_verified"] === 1) {
            res.json({
              auth: true,
              message: "Account already verified.",
            });
          } else {
            const dbVerifyUpdateQuery = `UPDATE user SET is_verified = true, updated_at = NOW() WHERE email = ?`;

            db.query(dbVerifyUpdateQuery, [decoded.email], (err, result) => {
              if (err) {
                res.status(500).json(err);
              } else {
                res.json({
                  auth: true,
                  message: "Account verified.",
                });
              }
            });
          }
        }
      });
    }
  });
});

// check available user for signin

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
