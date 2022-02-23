const wishlistModel = require("../models/wishlist.model");

const checkWishlistExist = (req, res, next) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  wishlistModel.checkWishlist([userId, productCode], (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results.length > 0) {
        wishlistModel.updateIsDeleted(
          [userId, productCode],
          (error, results) => {
            if (error) {
              throw error;
            } else {
              res.status(200).json({
                message: "Successfully added to wishlist.",
              });
            }
          }
        );
      } else {
        next();
      }
    }
  });
};

module.exports = {
  checkWishlistExist,
};