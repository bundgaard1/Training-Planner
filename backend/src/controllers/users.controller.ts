// users.controller.ts
import { Request, Response } from "express";
import { generateToken } from "../services/auth.service";
import { RegisterNewUser, LoginAUser } from "../services/users.service";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }

  const user = await RegisterNewUser(username, password);

  res.status(200).send({ id: user.id, username: user.username });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "username and password are required" });
  }
  
  try {
    const user = await LoginAUser(username, password);
    const token = generateToken({ id: user.id });

    res.cookie("authToken", token, {
      secure: process.env.NODE_ENV === "production",
    });

    res.send({ id: user.id, username: user.username, token });
  } catch (error) {
    return res.status(401).send({ error: "Invalid credentials" });
  }
};
