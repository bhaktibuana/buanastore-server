const express = require("express");
const cartRoutes = require("../controllers/cart.controller");
const cartMiddleware = require("../middlewares/cart.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/cart", authMiddleware.isAuthenticate, cartRoutes.getCart);
router.post(
  "/cart",
  authMiddleware.isAuthenticate,
  cartMiddleware.checkCartExist,
  cartRoutes.addCart
);

router.put(
  "/cart/softDelete",
  authMiddleware.isAuthenticate,
  cartRoutes.softDeleteCart
);

router.get(
  "/cart/checkSelected",
  authMiddleware.isAuthenticate,
  cartRoutes.checkSelectedCart
);

module.exports = router;
