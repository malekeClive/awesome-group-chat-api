const User = require('../models/user.model');

exports.create = (req, res) => {

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
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating user."
      });
    } else {
      res.send(data);
    }
  });
}