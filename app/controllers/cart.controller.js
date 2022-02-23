const cartModel = require("../models/cart.model");

const addCart = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  cartModel.create([userId, productCode], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Successfully added to cart.",
      });
    }
  });
};

const getCart = (req, res) => {
  const userId = res.locals.payload.id;

  cartModel.get([userId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "No item found in your cart.",
        });
      }
    }
  });
};

const softDeleteCart = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  cartModel.softDelete([userId, productCode], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Successfully soft deleted.",
      });
    }
  });
};

const checkSelectedCart = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.query.product_code;

  cartModel.countSelected([userId, productCode], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results[0].count === 0) {
        res.status(404).json({
          message: "Selected item not found.",
        });
      } else {
        res.status(200).json(results);
      }
    }
  });
};

module.exports = {
  addCart,
  getCart,
  softDeleteCart,
  checkSelectedCart,
};
