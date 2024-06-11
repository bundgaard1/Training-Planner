const jwt = require('jsonwebtoken');


function generateToken(payload) {
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (ex) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};