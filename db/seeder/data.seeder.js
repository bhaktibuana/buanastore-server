const db = require("../../config/dbConnection");
const fs = require("fs");

const dataProduct = JSON.parse(fs.readFileSync("./db/seeder/dataProduct.json"));
const dataProductCode = JSON.parse(fs.readFileSync("./db/seeder/dataProductCode.json"));
const dataTag = JSON.parse(fs.readFileSync("./db/seeder/dataTag.json"));
const dataProductTag = JSON.parse(fs.readFileSync("./db/seeder/dataProductTag.json"));
const dataDiscount = JSON.parse(fs.readFileSync("./db/seeder/dataDiscount.json"));

dataProduct.forEach((value) => {
  const insertQuery = `INSERT INTO product (product_name, price, description) VALUES (?, ?, ?);`;
  db.query(
    insertQuery,
    [value.product_name, value.price, value.description],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(`Data product: "${value.product_name}" inserted!`);
      }
    }
  );
});

dataProductCode.forEach((value) => {
  const insertQuery = `INSERT INTO product_code (code, product_id) VALUES (?, ?);`;
  db.query(insertQuery, [value.code, value.product_id], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(`Data product code: "${value.code}" inserted!`);
    }
  });
});

dataTag.forEach((value) => {
  const insertQuery = `INSERT INTO tag (tag_name) VALUES (?);`;
  db.query(insertQuery, [value.tag_name], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(`Data tag: "${value.tag_name}" inserted!`);
    }
  });
});

dataProductTag.forEach((value) => {
  const insertQuery = `INSERT INTO product_tag (product_id, tag_id) VALUES (?, ?);`;
  db.query(insertQuery, [value.product_id, value.tag_id], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log(
        `Data product tag: "${value.product_id}, ${value.tag_id}" inserted!`
      );
    }
  });
});

dataDiscount.forEach((value) => {
  const insertQuery = `INSERT INTO discount (discount_value, product_code_code) VALUES (?, ?);`;
  db.query(
    insertQuery,
    [value.discount_value, value.product_code_code],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(
          `Data discount: "${value.discount_value}, ${value.product_code_code}" inserted!`
        );
      }
    }
  );
});
