import React from "react";

import { useStateValue } from '../state';

import { Field, Formik, Form, ErrorMessage } from "formik";
import { Grid, Button, Form as UIForm } from "semantic-ui-react";

import { NumberField, DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { EntryTypeSelection, PatientSelection } from "./FormField";
import { Entry, HealthCheckRating } from "../types";


export interface BaseEntryFormValues {
  type: Entry['type'];
  patientSelect: string;
  diagnosisCodes?: string;
  description: string;
  date: string;
  specialist: string;
  discharge?: { date: string, criteria: string }
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: { startDate: string, endDate: string };
}

interface HealthCheckEntryValues extends BaseEntryFormValues {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntryValues extends BaseEntryFormValues {
  type: 'Hospital';
  discharge: { date: string, criteria: string };
}

interface OccupationalHealthEntryValues extends BaseEntryFormValues {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string, endDate: string };
}

export type EntryFormValues =
  | HealthCheckEntryValues
  | HospitalEntryValues
  | OccupationalHealthEntryValues


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const DynamicField: React.FC<{ type: Entry['type'] }> = ({ type }) => {
  switch(type) {
    case('HealthCheck'): 
      return(
        <Field
          label='Health Check Rating' 
          name='healthCheckRating'
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case('Hospital'):
      
      return(
        <UIForm.Field>
            <Field
              label='Discharge Date'
              name='discharge.date'
              component={TextField}
            />
            <Field
              label='Discharge Criteria'
              name='discharge.criteria'
              component={TextField}
            />
            <div style={{ color:'red' }}>
              <ErrorMessage name='discharge' />
            </div>
        </UIForm.Field>
      );
    case('OccupationalHealthcare'):
      
      return(
        <UIForm.Field>
            <Field
              label='Employer Name'
              name='employerName'
              component={TextField}
            />
            <Field
              label='Sick Leave Start'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='Sick Leave End'
              name='sickLeave.endDate'
              component={TextField}
            />
            <div style={{ color:'red' }}>
              <ErrorMessage name='sickLeave' />
            </div>
        </UIForm.Field>
      );
    /* returning a blank div as no need 
    *  for exhaustive type check as type is selected from dropdown
    */
    default:
      return(
        <div></div>
      )
  }
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnoses, patients }] = useStateValue();

  const entryTypes: Array<Entry['type']> = [
    'HealthCheck',
    'OccupationalHealthcare',
    'Hospital'
  ];
  
  return  (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        patientSelect: '',
        diagnosisCodes: '',
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: 0,
        discharge: {date: '', criteria: ''},
        employerName: '',
        sickLeave: {startDate: '', endDate: '' }
      }}
      validate={(values) => {
        const requriedError = 'Field is required';
        const errors: { [field: string]: string} = {};
          if (!values.date) {
            errors.date = requriedError;
          } else if (!/^\d{4}-\d{2}-\d{2}/.test(values.date)) {
            errors.date = 'Use date format YYYY-MM-DD';
          }
          if (!values.description) {
            errors.description = requriedError;
          }
          if (!values.patientSelect) {
            errors.patientSelect = requriedError;
          }
          if (!values.specialist) {
            errors.specialist = requriedError;
          }

          switch(values.type) {
            case ('Hospital'):
              if (!/^\d{4}-\d{2}-\d{2}/.test(values.discharge.date)) {
                errors.discharge = 'Use date format YYYY-MM-DD';
              } else if (!values.discharge.date || !values.discharge.criteria) {
                  errors.discharge = 'Please fill in all discharge data';
              }
              break;
            case ('OccupationalHealthcare'):
              if (!values.sickLeave?.endDate || !values.sickLeave.startDate) {
                errors.sickLeave = 'Please fill in both start and end dates';
              } else if (
                (!/^\d{4}-\d{2}-\d{2}/.test(values.sickLeave.startDate) 
              || !/^\d{4}-\d{2}-\d{2}/.test(values.sickLeave.endDate))
              ) {  
                errors.sickLeave = 'Use date format YYYY-MM-DD for both dates';
              }
              
              if (!values.employerName) {
                errors.employerName = requriedError;
          }
        }

        return errors; 
      }} 
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field 
              name='type'
              component={EntryTypeSelection}
              entryTypes={entryTypes} 
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Field 
              name='patientSelect'
              component={PatientSelection}
              patients={patients} 
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Field 
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date' 
              placeholder='Date' 
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist' 
              placeholder='Specialist' 
              name='specialist'
              component={TextField}
            />
            <DynamicField type={values.type} />
            <Field 
              name='diagnosesCodes'
              component={DiagnosisSelection}
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid> 
          </Form>
        );
      }}
    </Formik>
  )
};

export default AddEntryForm;

