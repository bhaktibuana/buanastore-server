const db = require("../config/dbConnection");

// get 10 list of products
const productThumbnail = (req, res) => {
  const index = parseInt(req.params.index);

  const selectQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(selectQuery, [index], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// get 10 list of products with category
const productThumbnailCategory = (req, res) => {
  const index = parseInt(req.params.index);
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const selectQuery =
    paramsArrLen > 1
      ? `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1) ORDER BY p.id ASC LIMIT ?, 10;`
      : `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0) ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(selectQuery, [paramsArr, index], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  productThumbnail,
  productThumbnailCategory,
};
