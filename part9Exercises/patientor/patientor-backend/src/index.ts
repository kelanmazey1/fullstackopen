import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});