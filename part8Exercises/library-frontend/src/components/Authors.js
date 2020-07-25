  
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import BirthyearForm from './BirthyearForm';
import { ALL_AUTHORS } from '../queries';

const Authors = ({ token }) => {
  // query the server for the authors -> save it in an array 
  const allAuthorsResult = useQuery(ALL_AUTHORS);

  if (allAuthorsResult.loading) {
    return <div>loading... </div>
  }

  const authors = allAuthorsResult.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        token ?  <BirthyearForm /> : null
      }
    </div>
  )
}

export default Authors
