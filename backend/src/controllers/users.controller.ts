// users.controller.ts
import { Request, Response } from "express";
import User from "../models/users.model";
import { generateToken } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }

  const user = new User({ username, password });
  await user.save();

  res.status(200).send();
};

export const loginUser = async (req: Request, res: Response) => {
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

  res.send({ id: user.id, username: user.username, token });
};