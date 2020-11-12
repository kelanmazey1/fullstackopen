import patientData from '../../data/patients';

import { Patient, NewPatient, PublicPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAll = (): Patient[] => {
  return patients;
}

const getAllPublic = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const requiredPatient = patients.find((patient) => patient.id === id);
  return requiredPatient;
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
  getAllPublic,
  getPatient,
  addPatient,
}

