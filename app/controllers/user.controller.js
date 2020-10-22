const User = require('../models/user.model');

exports.create = async (req, res) => {
  const { username, email, password } = req.body;
  // validate request
  if (!username || !email || !password) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
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
      console.log(result);
      throw result;
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occured while creating user."
    });
  }
}

exports.find() = async (req, res) => {
  
}