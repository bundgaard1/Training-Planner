import { Request, Response} from 'express';
import { verifyToken } from '../services/jwtService';
import { IncomingHttpHeaders } from 'http';


interface CustomRequest extends Request {
  user?: any;
}

function getTokenFromHeader(header: IncomingHttpHeaders) {
    if (header.authorization && header.authorization.split(' ')[0] === 'Bearer') {
        return header.authorization.split(' ')[1]
    }
    return null

}

function auth(req: CustomRequest, res: Response, next: any) {
  const token = getTokenFromHeader(req.headers as IncomingHttpHeaders);

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = verifyToken(token); 
    req.user = decoded; 
    next(); 
  } catch (ex) {
    res.status(400).send({ error: 'Invalid token.' });
  }
}

export default auth;