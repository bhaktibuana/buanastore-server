const db = require("../../config/dbConnection");

const countAll = (callback) => {
  const selectQuery = `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code`;
  db.query(selectQuery, callback);
};

const getProduct = (params, callback) => {
  const selectQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(selectQuery, params, callback);
};

const countSelected = (params, callback) => {
  const paramsArrLen = params[0].length;
  const selectQuery =
    paramsArrLen > 1
      ? `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1);`
      : `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0);`;

  db.query(selectQuery, params, callback);
};

const getSelectedProduct = (params, callback) => {
  const paramsArrLen = params[0].length;
  const selectQuery =
    paramsArrLen > 1
      ? `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1) ORDER BY p.id ASC LIMIT ?, 10;`
      : `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0) ORDER BY p.id ASC LIMIT ?, 10;`;

  db.query(selectQuery, params, callback);
};

const getDetail = (params, callback) => {
  const selectQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value, p.description FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE pc.code = ?;`;
  db.query(selectQuery, params, callback);
};

module.exports = {
  countAll,
  getProduct,
  countSelected,
  getSelectedProduct,
  getDetail,
};
