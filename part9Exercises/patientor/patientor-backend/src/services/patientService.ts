import patientData from '../../data/patients';

import { Patient, NewPatient, PublicPatient, Entry } from '../types';

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


const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    id: String(Math.round(Math.random() * 10)),
    ...patient,
  }

  patientData.concat(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientID: string, entry: Entry): Patient | Error => {
  
  // find patient 
  const patientToAdd = patients.find((patientInDB) => patientID === patientInDB.id);

  // check that patient exists and that the req entry doesn't contain pre existing id prop

  if (!patientToAdd) {
    return Error('No patient matching given ID');
  }
  
  if (Object.keys(entry).includes('id')) {
    return Error('Entries should not be supplied with an id property');
  }
  // to avoid TS error with overwriting the id prop
  Object.assign(entry, { id: String(Math.round(Math.random() * 10)) })

  patientToAdd?.entries.push(entry);

  return patientToAdd;
};

export default {
  getAll,
  getAllPublic,
  getPatient,
  addPatient,
  addEntry
}

