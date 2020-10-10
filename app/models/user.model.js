const sql = require('../../db');
const { promisify } = require('util');

// user object constructor
const User = function(user) {
  this.username   = user.username;
  this.email      = user.email;
  this.password   = user.password;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log(`Error ${err}`);
      result(err, null);
      return
    }

    result(null, { id: res.insertId, ...newUser });
  })
}

User.find = async email => {
  try {
    const query   = promisify(sql.query).bind(sql);
    const userId  = await query("SELECT user_id FROM user WHERE email = ?", email);
    return userId;
  } catch (error) {
    return error;
  }
}

module.exports = User;