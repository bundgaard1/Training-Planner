import { Request, Response, NextFunction } from "express";
import { verifyToken, decodedToken } from "../services/auth.service";
import { IncomingHttpHeaders } from "http";
import UserModel from "../models/users.model";
import { RequestWithUser } from "../interfaces/auth.interface";

function getTokenFromHeader(header: IncomingHttpHeaders): string | null {
  if (header.authorization && header.authorization.split(" ")[0] === "Bearer") {
    return header.authorization.split(" ")[1];
  }
  return null;
}

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = getTokenFromHeader(req.headers as IncomingHttpHeaders);

  if (!token) {
    res.status(401).send({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decodedToken = verifyToken(token);

    const user = await UserModel.findByPk(decodedToken.id);

    if (!user) {
      res.status(401).send({ error: "Access denied. No token provided." });
      return;
    }

    req.user = user;
    next();
  } catch (ex: any) {
    res.status(400).send({ error: ex.message });
  }
}

export default authMiddleware;
