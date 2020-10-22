const { promisify } = require('util');
const sql = require('../../db');

const login = async ( email, password ) => {
  try {
    const query = promisify(sql.query).bind(sql);
    const user  = await query("SELECT user_id, username, email FROM user WHERE email = ? AND password = ?", [ email, password ]);
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

const find = async () => {
  try {
    const query = promisify(sql.query).bind(sql);
    const user  = await query("SELECT user_id FROM user WHERE email = ?", email);
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = { login, create, find };