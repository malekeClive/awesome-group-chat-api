const jwt       = require('jsonwebtoken');
const { login } = require('../Repositories/userRepository');

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be null!"
    });
  }

  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    if (user.length === 0) {
      res.status(406).send({
        status: "ERROR",
        message: "Invalid email or password"
      });
    } else {
      const token = jwt.sign({ user }, 'THISISMUSTBESECRET');
      res.status(200).send({
        status: "OK",
        auth: token
      });
    }
  } catch (error) {
      res.status(402).send({
        status: "ERROR",
        message: error.message
      });
  }
}
