import express from "express";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controllers/users.controller";
import authMiddelware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",  logoutUser);
router.get("/profile", authMiddelware, getUserProfile);

export default router;