const { create, find } = require('../Repositories/userRepository')

// user object constructor
const User = function(user) {
  this.username   = user.username;
  this.email      = user.email;
  this.password   = user.password;
}

User.create = async newUser => {
  try {
    const user = await create(newUser);
    return user;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        error: true, 
        code: 1062,
        message: "email already registered to database" 
      };
    }
    return error;
  }
}

User.find = async userId => {
  try {
    const user = await find(userId);
    return user;
  } catch (error) {
    return error;
  }
}

module.exports = User;