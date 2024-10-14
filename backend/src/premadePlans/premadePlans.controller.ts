import { Request, Response } from "express";
import { RequestWithUser } from "../auth/auth.interface";
import * as PMPlanService from "./premadePlans.service";

export const getPremadePlans = async (req: RequestWithUser, res: Response) => {
	const plans = await PMPlanService.getPremadePlans();

	res.send(plans);
};

export const createBasedOnPremade = async (
	req: RequestWithUser,
	res: Response
) => {
	const { premadeId, startDate } = req.body;

	if (!premadeId || !startDate) {
		return res
			.status(400)
			.send({ error: "premadeId and startDate are required" });
	}

	const newPlan = await PMPlanService.createPlanBasedOnPremade(
		req.user!.id,
		premadeId,
		startDate
	);

	res.send(newPlan);
};
