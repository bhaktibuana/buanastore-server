const userModel = require("../models/user.model");
const { sendConfirmationEmail } = require("../services/email.service");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = (req, res) => {
  const userObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: passwordHash(req.body.password),
  };

  const baseUrl = req.protocol + "://" + req.get("host");

  sendConfirmationEmail(userObj, baseUrl)
    .then((result) => {
      if (result.accepted.length > 0) {
        userModel.create(
          [
            userObj.first_name,
            userObj.last_name,
            userObj.email,
            userObj.password,
          ],
          (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(200).json({
                message:
                  "Registration success! Please check your email and verify your account.",
              });
            }
          }
        );
      } else {
        res.status(500).json({
          message:
            "Oops, there is a little technical problem. Please try again later.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message:
          "Oops, there is a little technical problem. Please try again later.",
      });
    });
};

const signin = (req, res) => {
  const email = req.body.email;
  const password = passwordHash(req.body.password);

  userModel.getUser([email, password], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(403).json({
          message: "Wrong email or password.",
        });
      } else {
        if (results[0]["is_verified"] === 0) {
          res.status(400).json({
            message: "Please verify your account.",
          });
        } else {
          const token = jwt.sign(
            {
              id: results[0]["id"],
              first_name: results[0]["first_name"],
              last_name: results[0]["last_name"],
              email: results[0]["email"],
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );

          res.status(200).json({
            message: "Sign in success!",
            data: { token },
          });
        }
      }
    }
  });
};

const verifyAccount = (req, res) => {
  const email = res.locals.payload.email;

  userModel.updateIsVerified([email], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Account verification success.",
      });
    }
  });
};

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  signup,
  signin,
  verifyAccount,
};
