const db = require("../../config/dbConnection");

const create = (params, callback) => {
  const insertQuery = `INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const countUser = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ?;`;
  db.query(selectQuery, params, callback);
};

const getUser = (params, callback) => {
  const selectQuery = `SELECT id, first_name, last_name, email, is_verified FROM user WHERE email = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

const getIsVerified = (params, callback) => {
  const selectQuery = `SELECT is_verified FROM user WHERE email = ?;`;
  db.query(selectQuery, params, callback);
};

const updateIsVerified = (params, callback) => {
  const updateQuery = `UPDATE user SET is_verified = true, updated_at = CURRENT_TIMESTAMP() WHERE email = ?;`;
  db.query(updateQuery, params, callback);
};

module.exports = {
  create,
  countUser,
  getUser,
  getIsVerified,
  updateIsVerified,
};
