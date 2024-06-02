const express = require("express");
const Workout = require("../models/Workout");
const Plan = require("../models/Plan");

const router = express.Router();

router.get("/getPlan", async (req, res) => {
  planId = req.query.planId;

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
  const { weeks, name } = req.body;

  if (!weeks || !name) {
    return res.status(400).send({ error: "weeks and name are required" });
  }

  const plan = new Plan({ weeks, name });

  await plan.save();

  for (let i = 0; i < weeks; i++) {
    for (let j = 1; j <= 7; j++) {
      const workout = new Workout({
        workoutType: "Rest",
        distance: 0,
        description: "",
        day: i * 7 + j,
        planId: plan.id,
      });
      await workout.save();
    }

  }

  res.send(plan);
});

// Get all workouts associated with a plan
router.get("/getWorkoutsByPlan", async (req, res) => {
  planId = req.query.planId;

  if (!planId) {
    return res.status(400).send({ error: "planId is required in query" });
  }

  const workouts = await Workout.findAll({ where: { planId: planId } });

  res.send(workouts);
});

module.exports = router;
