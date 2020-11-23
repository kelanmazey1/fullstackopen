import React, { useEffect } from "react";
import axios from "axios";

import { List, Divider } from "semantic-ui-react";

import EntryDetail from "../components/EntryDetail";

import { useStateValue, setPatientInFocus } from "../state";

import { Patient} from "../types"

import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";

const PatientDetailPage: React.FC = () => {
  const [state, dispatch] = useStateValue();

  // used to add a delay to avoid flashing effect
  const [patientIsReady, setPatientIsReady] = React.useState(false);
  const [delayed, setDelayed] = React.useState(true);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientInFocus = async (patient: Patient | undefined) => {
      if (patient && patient.id === id) {
        setPatientIsReady(true);
        return () => setPatientIsReady(false);
      }
      try {
         const { data: patientInFocus } = await axios.get<Patient>(
         `${apiBaseUrl}/patients/${id}`
         );
          
         dispatch(setPatientInFocus(patientInFocus))
         setPatientIsReady(true);

         return () => setPatientIsReady(false);
        } catch (e) {
        console.error(e)
      }
    };

    fetchPatientInFocus(state.patientInFocus);
  }, [dispatch, state.patientInFocus, id]);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 200);
    return () => clearTimeout(timeout);
  }, [])


  return (
    <div>
      {patientIsReady && !delayed ?
         <List divided relaxed>
          <List.Item>
            <List.Content>
              <List.Header>{state.patientInFocus?.name}</List.Header>
              <List.Description>Name</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>{state.patientInFocus?.ssn}</List.Header>
              <List.Description>ssn</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
                <List.Header>{state.patientInFocus?.gender}</List.Header>
                <List.Description>gender</List.Description>
              </List.Content>
          </List.Item>
          <List.Item>
              <List.Content>
                <List.Header>{state.patientInFocus?.occupation}</List.Header>
                <List.Description>occupation</List.Description>
              </List.Content>
          </List.Item>
          <Divider horizontal>Entries</Divider>
              {
              state.patientInFocus?.entries.map((entry) => (
                    <EntryDetail key={entry.id} diagnoses={state.diagnoses} entry={entry} /> 
              ))
              }
        </List>
        : <div></div>
      }
    </div>
    
    
  )
}


export default PatientDetailPage;