const { promisify } = require('util');
const sql = require('../../db');

const store = async ( chat ) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("INSERT INTO user SET ?", chat);
  } catch (error) {
    return error;
  }
}


module.exports = { login };