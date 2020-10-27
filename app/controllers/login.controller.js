const jwt       = require('jsonwebtoken');
const { login } = require('../Repositories/userRepository');
const { errorFormat } = require('../helpers/clientResponseHandlers');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      throw errorFormat(406, "Empty");
    } else if (email.length === 0 || password.length === 0) {
      throw errorFormat(400, "Content cannot be null");
    }
    
    const user = await login(email, password);
    
    if (user.length === 0) {
      throw errorFormat(422, "Invalid email or password");
    } else {
      const token = jwt.sign({ user }, 'THISISMUSTBESECRET');
      const response = { status: "OK", code: 200, message: "Logged in", auth: token };
      console.log(response);
      res.status(200).send(response);
    }
  } catch (error) {
    if (!error.code) {
      res.status(500).send(errorFormat(error.message));
      return;
    }
    res.status(error.code).send(errorFormat(error.code, error.message));
  }
}
