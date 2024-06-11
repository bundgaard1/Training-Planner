const jwt = require('jsonwebtoken');


function auth(req, res, next) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers['authorization']; 
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey); 
    req.user = decoded; 
    next(); 
  } catch (ex) {
    res.status(400).send({ error: 'Invalid token.' });
  }
}

module.exports = auth;