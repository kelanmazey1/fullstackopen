import React from "react";
import { Diagnosis, Entry } from "../types";

import { Segment, Icon, Header } from "semantic-ui-react";

type EntryProps = {
  diagnoses: Diagnosis[] | undefined
  entry: Entry
};

const assertNever = (value: never): never => { throw new Error('Something went wrong') };
// exhaustive type check on entries and return component if valid type
const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return (

        <Segment>
          <Header size='medium'>{entry.date} <Icon name='hospital' /></Header>
          <div style={{padding: '2px'}}>{entry.description}</div>
          {
            (entry.diagnosisCodes && diagnoses)
              ? <div>
                  <Header size='small'>Diagnoses</ Header>
                  {
                    entry.diagnosisCodes.map((code) => (
                      <div key={code}>
                        {code} {diagnoses.filter((diagnosis) => diagnosis.code === code)
                                         .map((diagnosis) => diagnosis.name)
                        }
                      </div>
                    ))
                  }
                </div>
              : null
          }
          <Header size='small'>Discharge</Header>
          <div>date: {entry.discharge.date}</div>         
          <div>criteria: {entry.discharge.criteria}</div>         
        </Segment>)

    case 'HealthCheck':
      const segmentColour: Array<'green'|'yellow'|'orange'|'red'> = [
        'green',
        'yellow',
        'orange',
        'red'
      ]

      return (

        <Segment color={segmentColour[entry.healthCheckRating]}>
          <Header size='medium'>{entry.date} <Icon name='heartbeat' /></Header>
          <div style={{padding: '2px'}}>{entry.description}</div>
          {
            (entry.diagnosisCodes && diagnoses)
              ? <div>
                  <Header size='small'>Diagnoses</ Header>
                  {
                    entry.diagnosisCodes.map((code) => (
                      <div key={code}>
                        {code} {diagnoses.filter((diagnosis) => diagnosis.code === code)
                                         .map((diagnosis) => diagnosis.name)
                        }
                      </div>
                    ))
                  }
                </div>
              : null
          } 
          <div>Healthcheck Rating: {entry.healthCheckRating}</div>
        </Segment>)
    
    case 'OccupationalHealthcare':
      return (

        <Segment>
          <Header size='medium'>{entry.date} <Icon name='clipboard' /></Header>
          <div style={{padding: '2px'}}>{entry.description}</div>
          {
            (entry.diagnosisCodes && diagnoses)
              ? <div>
                  <Header size='small'>Diagnoses</ Header>
                  {
                    entry.diagnosisCodes.map((code) => (
                      <div key={code}>
                        {code} {diagnoses.filter((diagnosis) => diagnosis.code === code)
                                         .map((diagnosis) => diagnosis.name)
                        }
                      </div>
                    ))
                  }
                </div>
              : null
          }
          <Header size='small'>Employer & Sick leave</Header>
          <div>Employer: {entry.employerName}</div>
          <div>Sick leave: {
            entry.sickLeave
              ? <p>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
              : <p>No sick leave taken</p>}
          </div>
        </Segment>)

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;