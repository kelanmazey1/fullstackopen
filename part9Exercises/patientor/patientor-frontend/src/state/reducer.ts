import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
    {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }  
  | {
    type: "SET_PATIENT_IN_FOCUS";
    payload: Patient | undefined;
  }  
  | {
    type: "REMOVE_PATIENT_IN_FOCUS";
  }  
  | {
    type: "UPDATE_DIAGNOSES";
    payload: Diagnosis[];
  }  
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_IN_FOCUS":
      return {
        ...state,
        patientInFocus: action.payload,
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      state.patients.set(action.payload.id, action.payload);
      return state
    case "UPDATE_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      }
    default:
      return state;
  }
};

export function setPatientList(patients: Patient[]): Action {
  return {
    type:  "SET_PATIENT_LIST",
    payload: patients
  }
}
export function setPatientInFocus(patient: Patient | undefined): Action {
  return {
    type:  "SET_PATIENT_IN_FOCUS",
    payload: patient
  }
}
export function addPatient(payload: Patient): Action {
  return {
    type: "ADD_PATIENT",
    payload
  }
}
export function updatePatient(payload: Patient): Action {
  return {
    type:  "UPDATE_PATIENT",
    payload
  }
}
export function updateDiagnoses(payload: Diagnosis[]): Action {
  return {
    type:  "UPDATE_DIAGNOSES",
    payload
  }
}
