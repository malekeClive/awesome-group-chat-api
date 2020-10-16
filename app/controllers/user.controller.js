const User = require('../models/user.model');

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const { username, email, password } = req.body;

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

  console.log("=====================");
}