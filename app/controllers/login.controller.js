const jwt       = require('jsonwebtoken');
const { login } = require('../Repositories/userRepository');
const { errorFormat } = require('../helpers/responseHandlers');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(!req.body);
    if (!req.body) {
      throw errorFormat(406, "Empty");
    } else if (email.length === 0 || password.length === 0) {
      throw errorFormat(400, "Content cannot be null");
    }
    
    const user = await login(email, password);
    
    if (user.length === 0) {
      throw errorFormat(422, "Invalid email or password");
    } else {
      const token = jwt.sign({ user }, 'THISISMUSTBESECRET');
      res.status(200).send({ status: "OK", message: "Logged in", auth: token });
    }
  } catch (error) {
    if (!error.code) {
      res.status(500).send(errorFormat(error.message));
      return;
    }

    res.status(error.code).send(errorFormat(error.code, error.message));
  }
}
