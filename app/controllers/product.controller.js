const productModel = require("../models/product.model");

const countProducts = (req, res) => {
  productModel.countAll((error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

const getProductThumbnail = (req, res) => {
  const index = parseInt(req.params.index);

  productModel.getProduct([index], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Product not found.",
        });
      } else {
        res.status(200).json(results);
      }
    }
  });
};

const countSelectedProduct = (req, res) => {
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);

  productModel.countSelected([paramsArr], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

const getSelectedProductThumbnail = (req, res) => {
  const index = parseInt(req.params.index);
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);

  productModel.getSelectedProduct([paramsArr, index], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Product not found.",
        });
      } else {
        res.status(200).json(results);
      }
    }
  });
};

const productDetail = (req, res) => {
  const code = req.query.code;

  productModel.getDetail([code], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: `Product with code '${code}' not found.`,
        });
      } else {
        res.status(200).json(results);
      }
    }
  });
};

module.exports = {
  countProducts,
  getProductThumbnail,
  countSelectedProduct,
  getSelectedProductThumbnail,
  productDetail,
};
