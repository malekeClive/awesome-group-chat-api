const { promisify } = require('util');
const sql = require('../../db');

const login = async ( username, email, password ) => {
  try {
    const query = promisify(sql.query).bind(sql);
    const user  = await query("SELECT user_id, username, email FROM user WHERE (email = ? OR username = ?) AND password = ?", [ email, username, password ]);
    return user;
  } catch (error) {
    return error;
  }
}

const create = async (newUser) => {
  try {
    const query = promisify(sql.query).bind(sql);
    const user  = await query("INSERT INTO user SET ?", newUser);
    return user;
  } catch (error) {
    return error;
  }
}

const find = async (userId) => {
  try {
    const query = promisify(sql.query).bind(sql);
    const user  = await query("SELECT email FROM user WHERE user_id = ? LIMIT 1", userId);
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = { login, create, find };