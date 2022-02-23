const db = require("../../config/dbConnection");

const createUserQuery = `
  CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (20) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    email VARCHAR (30) NOT NULL,
    password VARCHAR (200) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
  );
`;

db.query(createUserQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table user created!");
  }
});

const createProductQuery = `
  CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (150) NOT NULL,
    price INT NOT NULL,
    description VARCHAR (2000) NOT NULL,
    PRIMARY KEY (id)
  );
`;

db.query(createProductQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table product created!");
  }
});

const createProductCodeQuery = `
  CREATE TABLE product_code (
    code VARCHAR (20) NOT NULL,
    product_id INT NOT NULL,
    purchased INT NOT NULL DEFAULT 0,
    PRIMARY KEY (code),
    FOREIGN KEY (product_id) REFERENCES product (id)
  );
`;

db.query(createProductCodeQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table product_code created!");
  }
});

const createTagQuery = `
  CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag_name VARCHAR (20) NOT NULL,
    PRIMARY KEY (id)
  );
`;

db.query(createTagQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table tag created!");
  }
});

const createProductTagQuery = `
  CREATE TABLE product_tag (
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (product_id, tag_id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
  );
`;

db.query(createProductTagQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table product_tag created!");
  }
});

const createWishlistQuery = `
  CREATE TABLE wishlist (
    user_id INT NOT NULL,
    product_code_code VARCHAR (20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (user_id, product_code_code),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (product_code_code) REFERENCES product_code (code)
  );
`;

db.query(createWishlistQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table wishlist created!");
  }
});

const createCartQuery = `
  CREATE TABLE cart (
    user_id INT NOT NULL,
    product_code_code VARCHAR (20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (user_id, product_code_code),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (product_code_code) REFERENCES product_code (code)
  );
`;

db.query(createCartQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table cart created!");
  }
});

const createDiscountQuery = `
  CREATE TABLE discount (
    id INT NOT NULL AUTO_INCREMENT,
    discount_value INT NOT NULL DEFAULT 0,
    product_code_code VARCHAR (20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (product_code_code) REFERENCES product_code (code)
  );
`;

db.query(createDiscountQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table discount created!");
  }
});
