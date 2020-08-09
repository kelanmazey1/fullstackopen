import patientData from '../../data/patients.json';

import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAll = (): Patient[] => {
  return patients;
}

const getAllNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: String(Math.round(Math.random() * 10)),
    ...entry,
  }

  patientData.concat(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAll,
  getAllNoSsn,
  addPatient,
}

