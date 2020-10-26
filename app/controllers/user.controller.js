const User = require('../models/user.model');
const { errorFormat, successFormat } = require('../helpers/responseHandlers');

exports.create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validate request
    if (!req.body) {
      throw errorFormat(406, "Empty");
    } else if (!username || !email || !password) {
      throw errorFormat(400, "Content cannot be empty!")
    } 
  
    // Create user
    const user = new User({
      username: username,
      email: email,
      password: password
    });
  
    // Save user in the database
    const result = await User.create(user);

    if (result.error) throw result;

    const newUser = { userId: result.insertId, username: user.username }

    res.status(200).send(successFormat(200, "User created", newUser));

  } catch (error) {
    if (!error.code) {
      res.status(500).send(errorFormat(500, error.message)); 
      return;
    }

    res.status(error.code).send(errorFormat(error.code, error.message));
  }
}

exports.find = async (req, res) => {
  const { userId } = req.body;

  if (!userId) throw errorFormat(400, "Content cannot be empty!");

  try {
    const result = await User.find(userId);

    if (result.error) throw result;
    
    res.status(200).send(successFormat("User founded", result));
  } catch (error) {
    if (!error.code) {
      res.status(500).send(errorFormat(error.message));
    }

    res.status(error.code).send(errorFormat(error.code, error.message));
  }
}