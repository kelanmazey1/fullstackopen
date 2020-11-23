import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import AddPatientModal from "../AddPatientModal";
import AddEntryModal from "../AddEntryModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";;

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [addPatientModalOpen, setPatientModalOpen] = React.useState<boolean>(false);
  const [addEntryModalOpen, setEntryModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openPatientModal = (): void => setPatientModalOpen(true);

  const closePatientModal = (): void => {
    setPatientModalOpen(false);
    setError(undefined);
  };

  const openEntryModal = (): void => setEntryModalOpen(true);

  const closeEntryModal = (): void => {
    setEntryModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closePatientModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    // remove patient id from req as not needed after url is defined
    const { patientSelect, ...reqValues} = values;
    try {
      

      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${values.patientSelect}/entries`,
        reqValues
      );
      console.log('returned patient', patient);
      // dispatch(updatePatient(patient));

      closeEntryModal();
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient list</h3>
      </Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Occupation</Table.HeaderCell>
            <Table.HeaderCell>Health Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(patients).map((patient: Patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <AddPatientModal
        modalOpen={addPatientModalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closePatientModal}
      />
      <Button onClick={() => openPatientModal()}>Add New Patient</Button>
      <AddEntryModal
        modalOpen={addEntryModalOpen}
        onSubmit={submitNewEntry}
        onClose={closeEntryModal}
      />
      <Button onClick={() => openEntryModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientListPage;
