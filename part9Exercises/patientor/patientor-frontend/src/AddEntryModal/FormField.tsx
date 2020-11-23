import React from 'react';

import { Form, Dropdown, DropdownProps } from 'semantic-ui-react';
import { ErrorMessage, FieldInputProps, FormikProps } from 'formik';

import { Patient, Entry } from '../types';



export const PatientSelection = ({
  patients,
  setFieldValue,
  setFieldTouched,
  field
  }: {
    patients: Map<string, Patient>;
    setFieldValue: FormikProps<{ patientNames: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ patientNames: string[] }>["setFieldTouched"];
    field: FieldInputProps<{name: string}>;
  }) => {
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched('patientSelect', true);
    setFieldValue('patientSelect', data.value);
  };
  const { name } = field;
  
  const patientOptions = Object.values(patients).map((patient) => ({
    key: patient.id,
    text: patient.name,
    value: patient.id
  }));

  return (
    <Form.Field>
      <label>Patient</label>
        <Dropdown
          fluid
          selection
          options={patientOptions}
          onChange={onChange}
        />
      <div style={{ color:'red' }}>
        <ErrorMessage name={name}/>
      </div>
    </Form.Field>
)};


export const EntryTypeSelection = ({
  entryTypes,
  setFieldTouched,
  setFieldValue,
  field,
  ...props
}: {
  entryTypes: Array<Entry['type']>;
  setFieldValue: FormikProps<{ entryTypes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ entryTypes: string[] }>["setFieldTouched"];
  field: FieldInputProps<{name: string}>;
}) => {

  const { name } = field;

  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(name, true);
    setFieldValue(name, data.value);
  }

  const entryOptions = entryTypes.map((entryType) => ({
    key: entryType,
    text: entryType,
    value: entryType
  }));

  return(
    <Form.Field>
    <label>Entry Type</label>
      <Dropdown
        fluid
        selection
        options={entryOptions}
        onChange={onChange}
      />
    </Form.Field>
  );
};
