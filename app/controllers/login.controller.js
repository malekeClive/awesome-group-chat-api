const jwt       = require('jsonwebtoken');
const { login } = require('../Repositories/userRepository');
const { errorFormat } = require('../helpers/responseHandlers');

exports.login = async (req, res) => {
  if (!req.body) res.status(400).send(errorFormat("Cannot be null"));

  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    
    if (user.length === 0) {
      res.status(406).send(errorFormat("Invalid email or password"));
    } else {
      const token = jwt.sign({ user }, 'THISISMUSTBESECRET');
      res.status(200).send({ status: "OK", message: "Logged in", auth: token });
    }
  } catch (error) {
      res.status(402).send(errorFormat(error.message));
  }
}
