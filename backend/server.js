const express = require("express");
const sequelize = require('./database');
const cors = require("cors");
const planRoutes = require("./routes/planRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes")
const User = require("./models/User");
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

async function createTestUser() {
  const testUser = await User.findOne({ where: { username: 'test' } });
  
  if (!testUser) {
    await User.create({ username: 'test', password: 'test' });
    console.log('Test user created');
  }
}

sequelize.sync().then(() => {
  createTestUser();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database', error);
});