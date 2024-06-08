const express = require("express");

const Plan = require("../models/Plan");
const {createWorkoutsForPlan}  = require("../services/planService")

const router = express.Router();

router.get("/getPlan/:planId", async (req, res) => {
  const planId = req.params.planId;

  if (!planId) {
    return res.status(400).send({ error: "planID is required is query" });
  }

  const plan = await Plan.findByPk(planId);

  if (!plan) {
    return res.status(400).send({ error: "Plan not found" });
  }

  res.send(plan);
});

router.get("/getPlans", async (req, res) => {
  const plans = await Plan.findAll();

  res.send(plans);
});

router.post("/createPlan", async (req, res) => {
  const { weeks, name, date } = req.body;

  if (!weeks || !name || !date) {
    return res.status(400).send({ error: "weeks and name are required" });
  }

  const plan = new Plan({ weeks, name, date });

  await plan.save();

  await createWorkoutsForPlan(plan, weeks);

  res.send(plan);
});

module.exports = router;