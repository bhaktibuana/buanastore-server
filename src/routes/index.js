const express = require("express");
const { productDetail } = require("../controller/productDetail");
const { signup } = require("../controller/signup");
const { accountVerify } = require("../controller/accountVerify");
const { signin } = require("../controller/signin");
const { authJWT } = require("../controller/authJWT");
const {
  productCountAll,
  productCountCategory,
} = require("../controller/productCount");
const {
  productThumbnail,
  productThumbnailCategory,
} = require("../controller/productThumbnail");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

router.get("/product-count", productCountAll);
router.get("/product-count-category", productCountCategory);
router.get("/product-thumbnail/:index", productThumbnail);
router.get("/product-thumbnail-category/:index", productThumbnailCategory);
router.get("/product-detail", productDetail);
router.post("/signup", signup);
router.get("/account/verify", accountVerify);
router.post("/signin", signin);
router.get("/user-authentication", authJWT);

module.exports = router;
