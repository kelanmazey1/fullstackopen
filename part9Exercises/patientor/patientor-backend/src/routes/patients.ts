import express from 'express';
import patientService from '../services/patientService';

import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPublic());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id)

  if (typeof patient === "undefined") {
    res.status(404).send('Could not find patient');
  }

  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const patientToBeAdded = toNewPatientEntry(req.body);
    const newAddedPatient = patientService.addPatient(patientToBeAdded);

    res.json(newAddedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;