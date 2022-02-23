const Validator = require("validatorjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerValidation = (req, res, next) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const rules = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string|min:8|confirmed",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    next();
  } else {
    res.status(400).json({
      message: validation.errors.all(),
    });
  }
};

const checkIsUserExist = (req, res, next) => {
  const email = req.body.email;

  userModel.countUser([email], (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results[0].count === 0) {
        next();
      } else {
        res.status(400).json({
          message: "User already exist! Use another email.",
        });
      }
    }
  });
};

const loginValidation = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const rules = {
    email: "required|email",
    password: "required|string|min:8",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    next();
  } else {
    res.status(400).json({
      message: validation.errors.all(),
    });
  }
};

const checkIsVerified = (req, res, next) => {
  const token = req.query.token;

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    { algorithms: ["HS256"] },
    (err, payload) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Token.",
        });
      } else {
        userModel.getIsVerified([payload.email], (error, results) => {
          if (error) {
            throw error;
          } else {
            if (results[0]["is_verified"] === 1) {
              res.status(400).json({
                message: "Account is already verified.",
              });
            } else {
              res.locals.payload = payload;
              next();
            }
          }
        });
      }
    }
  );
};

module.exports = {
  registerValidation,
  checkIsUserExist,
  loginValidation,
  checkIsVerified,
};
