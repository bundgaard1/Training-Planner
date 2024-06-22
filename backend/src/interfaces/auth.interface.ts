import { IUser } from "../interfaces/users.interface";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user?: IUser;
}
