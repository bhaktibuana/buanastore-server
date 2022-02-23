const express = require("express");
const wishlistRoutes = require("../controllers/wishlist.controller");
const wishlistMiddleware = require("../middlewares/wishlist.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/wishlist",
  authMiddleware.isAuthenticate,
  wishlistRoutes.getWishlist
);

router.post(
  "/wishlist",
  authMiddleware.isAuthenticate,
  wishlistMiddleware.checkWishlistExist,
  wishlistRoutes.addWishlist
);

router.put(
  "/wishlist/softDelete",
  authMiddleware.isAuthenticate,
  wishlistRoutes.softDeleteWishlist
);

router.get(
  "/wishlist/checkSelected",
  authMiddleware.isAuthenticate,
  wishlistRoutes.checkSelectedWishlist
);

module.exports = router;
