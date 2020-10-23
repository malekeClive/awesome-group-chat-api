const User = require('../models/user.model');
const { errorFormat, successFormat } = require('../helpers/responseHandlers');

exports.create = async (req, res) => {
  const { username, email, password } = req.body;
  
  // validate request
  if (!username || !email || !password) {
    res.status(400).send(errorFormat("Content cannot be empty!"));
  }

  // Create user
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  // Save user in the database
  try {
    const result = await User.create(user);

    if (result.error) {
      throw result;
    }

    const newUser = {
      userId: result.insertId,
      username: user.username
    }

    res.status(200).send(successFormat("User created", newUser));

  } catch (error) {
    if (error.code === 406) {
      res.status(error.code).send(errorFormat(error.message));
    }

    res.status(500).send(errorFormat(error.message));
  }
}

exports.find = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).send(errorFormat("Content cannot be empty!"));
  }

  try {
    const result = await User.find(userId);
    if (result.error) {
      throw result;
    }
    res.status(200).send(successFormat("User founded", result));
  } catch (error) {
    res.status(404).send(errorFormat(error.message));
  }
}