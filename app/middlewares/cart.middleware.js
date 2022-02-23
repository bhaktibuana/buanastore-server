const cartModel = require("../models/cart.model");

const checkCartExist = (req, res, next) => {
  const userId = res.locals.payload.id;
  const productCode = req.body.product_code;

  cartModel.checkCart([userId, productCode], (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results.length > 0) {
        cartModel.updateIsDeleted([userId, productCode], (error, results) => {
          if (error) {
            throw error;
          } else {
            res.status(200).json({
              message: "Successfully added to cart.",
            });
          }
        });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  checkCartExist,
};
