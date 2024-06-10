const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  // Register user
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }

  const user = new User({ username, password });
  await user.save();

  res.send(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }

  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  res.send(user);
});

router.post("/logout", async (req, res) => {
  // Logout user
  res.status(501).send({ error: "Not implemented" });
});

router.get("/profile", async (req, res) => {
  // Get user profile
  res.status(501).send({ error: "Not implemented" });
});

router.put("/profile", async (req, res) => {
  // Update user profile
  res.status(501).send({ error: "Not implemented" });
});

router.delete("/profile", async (req, res) => {
  // Delete user
  res.status(501).send({ error: "Not implemented" });
});

module.exports = router;
