const express = require("express");
const userRoutes = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/signin", userMiddleware.loginValidation, userRoutes.signin);
router.post(
  "/signup",
  userMiddleware.registerValidation,
  userMiddleware.checkIsUserExist,
  userRoutes.signup
);

router.get(
  "/account/verify",
  userMiddleware.checkIsVerified,
  userRoutes.verifyAccount
);

module.exports = router;
