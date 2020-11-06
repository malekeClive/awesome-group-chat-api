const jwt = require('jsonwebtoken');

module.exports = async ( req, res, next ) => {
  try {
    console.log("____");
    const token         = req.headers.authorization.split(' ')[1];
    const decodedToken  = await jwt.verify(token, 'THISISMUSTBESECRET');
    const user          = decodedToken.user[0];

    if (!token) {
      throw new Error('Not authenticated');
    } else {
      res.locals.user = user; // res.locals is the recommended way of passing data through middleware.
      next();
    }
  } catch (error) {
    res.status(401).json({
      msg: error.message
    });
  }
}