const { create, find } = require('../Repositories/userRepository');
const { modelErrorHandler } = require('../helpers/serverResponseHandlers');

// user object constructor
const User = function(user) {
  this.username   = user.username;
  this.email      = user.email;
  this.password   = user.password;
}

User.create = async newUser => {
  try {
    return await create(newUser);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return modelErrorHandler(406, "Email already registered to database")
    } 
    return error;
  }
}

User.find = async userId => {
  try {
    const findUserById = await find(userId);
    if (findUserById.length === 0) throw modelErrorHandler(404, "User not found");

    return findUserById;
  } catch (error) {
    return error;
  }
}

module.exports = User;