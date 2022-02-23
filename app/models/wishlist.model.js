const db = require("../../config/dbConnection");

const create = (params, callback) => {
  const insertQuery = `INSERT INTO wishlist (user_id, product_code_code) VALUES (?, ?);`;
  db.query(insertQuery, params, callback);
};

const checkWishlist = (params, callback) => {
  const selectQuery = `SELECT * FROM wishlist WHERE user_id = ? AND product_code_code = ? AND is_deleted = TRUE;`;
  db.query(selectQuery, params, callback);
};

const updateIsDeleted = (params, callback) => {
  const updateQuery = `UPDATE wishlist SET is_deleted = FALSE, updated_at = CURRENT_TIMESTAMP() WHERE user_id = ? AND product_code_code = ?;`;
  db.query(updateQuery, params, callback);
};

const get = (params, callback) => {
  const selectQuery = `SELECT user_id, product_code_code AS product_code FROM wishlist WHERE user_id = ? AND is_deleted = FALSE;`;
  db.query(selectQuery, params, callback);
};

const softDelete = (params, callback) => {
  const updateQuery = `UPDATE wishlist SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP() WHERE user_id = ? AND product_code_code = ?;`;
  db.query(updateQuery, params, callback);
};

const countSelected = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM wishlist WHERE user_id = ? AND product_code_code = ? AND is_deleted = FALSE;`;
  db.query(selectQuery, params, callback);
};

module.exports = {
  create,
  checkWishlist,
  updateIsDeleted,
  get,
  softDelete,
  countSelected,
};
