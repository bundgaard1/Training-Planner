// server.js
const express = require("express");
const sequelize = require('./database');
const cors = require("cors");
const planRoutes = require("./routes/planRoutes");

require('./models/associations');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/plan", planRoutes);

app.get("/", (req, res) => {
  res.send("Hello Training Planner API!");
});



sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database', error);
});