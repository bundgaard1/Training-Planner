import express from "express";
import cors from "cors";
import planRoutes from "./routes/planRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import userRoutes from "./routes/userRoutes";
import { createTestUser } from "./services/usersService";
import db from "./database";

require("dotenv").config();

require("./models/associations");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/plans", planRoutes);
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am Trining Planner API!");
});

db.sync()
  .then(() => {
    createTestUser();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Error connecting to the database", error);
  });
