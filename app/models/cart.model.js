const db = require("../../config/dbConnection");

const create = (params, callback) => {
  const insertQuery = `INSERT INTO cart (user_id, product_code_code) VALUES (?, ?);`;
  db.query(insertQuery, params, callback);
};

const checkCart = (params, callback) => {
  const selectQuery = `SELECT * FROM cart WHERE user_id = ? AND product_code_code = ? AND is_deleted = TRUE;`;
  db.query(selectQuery, params, callback);
};

const updateIsDeleted = (params, callback) => {
  const updateQuery = `UPDATE cart SET is_deleted = FALSE, updated_at = CURRENT_TIMESTAMP() WHERE user_id = ? AND product_code_code = ?;`;
  db.query(updateQuery, params, callback);
};

const get = (params, callback) => {
  const selectQuery = `SELECT c.user_id, c.product_code_code AS product_code, p.product_name FROM cart AS c JOIN product_code AS pc ON pc.code = c.product_code_code JOIN product AS p ON p.id = pc.product_id WHERE c.user_id = ? AND c.is_deleted = FALSE ORDER BY c.updated_at;`;
  db.query(selectQuery, params, callback);
};

const softDelete = (params, callback) => {
  const updateQuery = `UPDATE cart SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP() WHERE user_id = ? AND product_code_code = ?;`;
  db.query(updateQuery, params, callback);
};

const countSelected = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM cart WHERE user_id = ? AND product_code_code = ? AND is_deleted = FALSE;`;
  db.query(selectQuery, params, callback);
};

module.exports = {
  create,
  checkCart,
  updateIsDeleted,
  get,
  softDelete,
  countSelected,
};
