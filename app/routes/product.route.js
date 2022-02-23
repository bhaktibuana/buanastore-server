const express = require("express");
const productRoutes = require("../controllers/product.controller");

const router = express.Router();

router.get("/product/detail", productRoutes.productDetail);
router.get("/product/count", productRoutes.countProducts);
router.get("/product/:index", productRoutes.getProductThumbnail);
router.get("/product/category/count", productRoutes.countSelectedProduct);
router.get(
  "/product/category/:index",
  productRoutes.getSelectedProductThumbnail
);

module.exports = router;
