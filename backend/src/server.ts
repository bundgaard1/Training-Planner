import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import db from "./database";
import { RegisterNewUser } from "./users/users.service";
import router from "./routes";

import "./models/associations.model";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(router);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, I am Trining Planner API!");
});

const startServer = async () => {
	try {
		await db.sync();
		await RegisterNewUser("test", "test");
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Error connecting to the database", error);
	}
};

startServer();
