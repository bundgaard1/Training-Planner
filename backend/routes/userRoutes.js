const express = require("express");
const User = require("../models/User");
const jwtService = require("../services/jwtService");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }

  const user = new User({ username, password });
  await user.save();
  
  res.status(200).send();
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
  const token = jwtService.generateToken({ id: user.id });

  res.cookie("authToken", token, {
    secure: process.env.NODE_ENV === "production",
  });

  res.send({ id: user.id, username: user.username, token});
});

router.post("/logout", async (req, res) => {
  res.clearCookie("authToken");
  res.send();
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
