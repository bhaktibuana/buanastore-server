const db = require("../config/dbConnection");

// get count of all products
const productCountAll = (req, res) => {
  const selectQuery = `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code`;
  db.query(selectQuery, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

// get count of products with category
const productCountCategory = (req, res) => {
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const selectQuery =
    paramsArrLen > 1
      ? `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1);`
      : `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0);`;
  db.query(selectQuery, [paramsArr], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  productCountAll,
  productCountCategory,
};
