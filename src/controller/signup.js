const Validator = require("validatorjs");
const crypto = require("crypto");
const db = require("../config/dbConnection");
const { sendConfirmationEmail } = require("../services/emailServices");

const signup = (req, res) => {
  const userObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const dataValidation = dataValidator(userObj);

  if (dataValidation === true) {
    userObj.password = crypto
      .createHash("sha256")
      .update(userObj.password)
      .digest("hex");

    const baseUlr = req.protocol + "://" + req.get("host");

    const isUserExistQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ?`;
    db.query(isUserExistQuery, [userObj.email], (err, result) => {
      if (err) {
        res.json(err);
      } else {
        if (result[0]["count"] === 1) {
          res.json({
            signup: false,
            message: "User already exist! Use another email.",
          });
        } else {
          sendConfirmationEmail(userObj, baseUlr)
            .then((result) => {
              const insertQuery = `INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?);`;

              db.query(
                insertQuery,
                [
                  userObj.first_name,
                  userObj.last_name,
                  userObj.email,
                  userObj.password,
                ],
                (err, result) => {
                  if (err) {
                    res.json(err);
                  } else {
                    res.json({
                      signup: true,
                      message:
                        "Registration success! Please check your email and verify your account.",
                    });
                  }
                }
              );
            })
            .catch((error) => {
              res.json({
                signup: false,
                message:
                  "Oops, there is a little technical problem. Please try again later.",
              });
            });
        }
      }
    });
  } else {
    res.json({
      validation: false,
      message: dataValidation,
    });
  }
};

const dataValidator = (dataObj) => {
  const data = {
    first_name: dataObj.first_name,
    last_name: dataObj.last_name,
    email: dataObj.email,
    password: dataObj.password,
    password_confirmation: dataObj.password_confirmation,
  };

  const rules = {
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string|min:8|confirmed",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    return true;
  } else {
    return validation.errors.all();
  }
};

module.exports = { signup };
