import jwt, { Secret } from 'jsonwebtoken';


function generateToken(payload: string | object) {
  const secretKey: Secret | undefined = process.env.JWT_SECRET_KEY;
  console.log(secretKey);
  if (secretKey) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }
  throw new Error('JWT secret key is undefined');
}

function verifyToken(token: string) {
  const secretKey: Secret | undefined = process.env.JWT_SECRET_KEY;

  try {
    if (secretKey) {
      return jwt.verify(token, secretKey);
    }
    throw new Error('JWT secret key is undefined');
  } catch (ex) {
    throw new Error('Invalid token');
  }
}

export { generateToken, verifyToken };