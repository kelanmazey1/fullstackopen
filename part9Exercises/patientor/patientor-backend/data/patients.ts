import { Patient } from '../src/types';
import toNewPatientEntry from '../src/utils';

import data from './patients.json';

const patients: Patient [] = data.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patients;