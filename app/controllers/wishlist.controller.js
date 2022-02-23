const wishlistModel = require("../models/wishlist.model");

const addWishlist = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  wishlistModel.create([userId, productCode], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Successfully added to wishlist.",
      });
    }
  });
};

const getWishlist = (req, res) => {
  const userId = res.locals.payload.id;

  wishlistModel.get([userId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: "You dont have wishlist yet.",
        });
      }
    }
  });
};

const softDeleteWishlist = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  wishlistModel.softDelete([userId, productCode], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Successfully soft deleted.",
      });
    }
  });
};

const checkSelectedWishlist = (req, res) => {
  const userId = res.locals.payload.id;
  const productCode = req.query.product_code;

  wishlistModel.countSelected([userId, productCode], (error, results) => {
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
  addWishlist,
  getWishlist,
  softDeleteWishlist,
  checkSelectedWishlist,
};
