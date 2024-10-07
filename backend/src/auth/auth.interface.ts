import { IUser } from "../users/users.interface";
import { Request } from "express";

export interface RequestWithUser extends Request {
	user?: IUser;
}
