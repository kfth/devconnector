const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  //chck if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verfiy token

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Toekn is not valid' });
  }
};
