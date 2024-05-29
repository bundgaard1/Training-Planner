const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const workoutSchema = new mongoose.Schema({
  name: String,
  distance: Number,
});

const Workout = mongoose.model('Workout', workoutSchema);


app.post('/workouts', (req, res) => {
  const workout = new Workout(req.body);
  console.log(req.body)
  res.status(201).send(workout);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});