import express from "express";
import { Request, Response } from "express";
import User from "../models/User";
import {generateToken} from "../services/jwtService";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
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

router.post("/login", async (req: Request, res: Response) => {
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
  const token = generateToken({ id: user.id });

  res.cookie("authToken", token, {
    secure: process.env.NODE_ENV === "production",
  });

  res.send({ id: user.id, username: user.username, token});
});

router.post("/logout", async (_req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.send();
});



export default router;
