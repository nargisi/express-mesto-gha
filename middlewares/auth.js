const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация!' });
  }
  req.user = payload;
  return next();
};
