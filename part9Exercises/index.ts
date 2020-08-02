import express from 'express';
const app = express();

app.use(express.json());

import { calculateExercise } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi: calculateBmi(weightNumber, heightNumber),
  });


  });

app.post('/exercises', (req, res) => {

  const { exerciseHours, target } = req.body;
  // type checking and making sure args provided
  if (!exerciseHours || !target) {
    res.status(400).json({ error: "parameters missing"});
  }

  if (!Array.isArray(exerciseHours) || typeof target !== 'number') {
    res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line
  exerciseHours.forEach((element: any) => typeof element !== 'number'
    ? res.status(400).json({ error: "malformatted parameters" })
    : null);

  res.json(calculateExercise(exerciseHours, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});