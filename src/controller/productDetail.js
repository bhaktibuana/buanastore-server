const db = require("../config/dbConnection");

const productDetail = (req, res) => {
  const code = req.query.code;

  const selectQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value, p.description FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE pc.code = ?;`;
  db.query(selectQuery, [code], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = { productDetail };
