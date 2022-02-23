const express = require("express");
const productRouter = require("./product.route");
const userRouter = require("./user.route");
const wishlistRouter = require("./wishlist.route");
const cartRouter = require("./cart.route");

const router = express.Router();

router.use("/", productRouter);
router.use("/", userRouter);
router.use("/", wishlistRouter);
router.use("/", cartRouter);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Buana Store API Server.",
  });
});

module.exports = router;
