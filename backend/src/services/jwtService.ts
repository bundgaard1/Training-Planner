import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret | undefined = process.env.JWT_SECRET;

function generateToken(payload: string | object) {
  if (secretKey) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }
  throw new Error('JWT secret key is undefined');
}

function verifyToken(token: string) {
  try {
    if (secretKey) {
      return jwt.verify(token, secretKey);
    }
    throw new Error('JWT secret key is undefined');
  } catch (ex) {
    return null;
  }
}

export { generateToken, verifyToken };