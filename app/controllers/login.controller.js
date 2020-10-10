const jwt = require('jsonwebtoken');
const sql = require('../../db');

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be null!"
    });
  }

  const { email, password } = req.body;

  sql.query("SELECT email, password FROM user WHERE email = ? AND password = ?", [email, password], (err, data) => {
    if (err) {
      res.status(402).send({
        status: "ERROR",
        message: err
      });
    } else if (data.length === 0) {
      res.status(406).send({
        status: "ERROR",
        message: "Invalid email or password"
      });
    } else {
      const token = jwt.sign({ data }, 'THISISMUSTBESECRET');
      
      res.status(200).send({
        status: "OK",
        auth: token
      });
    }
  });
}
