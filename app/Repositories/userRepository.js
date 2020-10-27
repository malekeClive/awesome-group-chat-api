const { promisify } = require('util');
const sql = require('../../db');

const login = async ( email, password ) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("SELECT user_id, username, email FROM user WHERE email = ? AND password = ?", [ email, password ]);
  } catch (error) {
    return error;
  }
}

const create = async (newUser) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("INSERT INTO user SET ?", newUser);
  } catch (error) {
    return error;
  }
}

const find = async (userId) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("SELECT email FROM user WHERE user_id = ? LIMIT 1", userId);
  } catch (error) {
    return error;
  }
}

module.exports = { login, create, find };