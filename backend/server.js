const express = require("express");
const sequelize = require('./database');
const cors = require("cors");
const planRoutes = require("./routes/planRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes")
require('dotenv').config();

require('./models/associations');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/plans", planRoutes);
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, I am Training Planner API!");
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database', error);
});