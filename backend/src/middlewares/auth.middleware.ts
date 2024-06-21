import { Request, Response} from 'express';
import { verifyToken } from '../services/auth.service';
import { IncomingHttpHeaders } from 'http';




function getTokenFromHeader(header: IncomingHttpHeaders) {
    if (header.authorization && header.authorization.split(' ')[0] === 'Bearer') {
        return header.authorization.split(' ')[1]
    }
    return null

}

function auth(req: Request, res: Response, next: any) {
  const token = getTokenFromHeader(req.headers as IncomingHttpHeaders);

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
  
  try {
    verifyToken(token); 
    next(); 
  } catch (ex: any) {
    res.status(400).send(ex.message);
  }
}

export default auth;