const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./services/dbConnection");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

// get count of all products
app.get("/get/product-count", (req, res) => {
  const dbQuery = `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code`;
  db.query(dbQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get 10 product list for product thumbnail card
app.get("/get/product-thumbnail/:index", (req, res) => {
  const index = parseInt(req.params.index);

  const dbQuery = `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(dbQuery, [index], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get count of products with category
app.get("/get/product-count-category", (req, res) => {
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const dbQuery =
    paramsArrLen > 1
      ? `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1);`
      : `SELECT COUNT(*) AS total FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0);`;
  db.query(dbQuery, [paramsArr], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// get 10 product list for product thumbnail with category
app.get("/get/product-thumbnail-category/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const paramsArr = Object.keys(req.query).map((key) => req.query[key]);
  const paramsArrLen = paramsArr.length;

  const dbQuery =
    paramsArrLen > 1
      ? `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 1) ORDER BY p.id ASC LIMIT ?, 10;`
      : `SELECT pc.code, p.product_name, p.price, d.discount_value FROM product_code AS pc JOIN product AS p ON pc.product_id = p.id JOIN discount AS d ON pc.code = d.product_code_code WHERE p.id IN (SELECT product_id FROM (SELECT * FROM product_tag WHERE tag_id IN ((SELECT id FROM tag WHERE tag_name IN (?)))) AS a GROUP BY product_id HAVING COUNT(*) > 0) ORDER BY p.id ASC LIMIT ?, 10;`;
  db.query(dbQuery, [paramsArr, index], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
