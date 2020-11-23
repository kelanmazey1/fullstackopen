import diagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>

const getAll = (): Diagnosis[] => {
  return diagnoses;
}

export default {
  getAll,
}