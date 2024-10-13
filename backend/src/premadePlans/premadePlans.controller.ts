import { Request, Response } from "express";
import { RequestWithUser } from "../auth/auth.interface";
import * as PMPlanService from "./premadePlans.service";

export const getPremadePlans = async (req: RequestWithUser, res: Response) => {
	const plans = await PMPlanService.getPremadePlans();

	res.send(plans);
};
