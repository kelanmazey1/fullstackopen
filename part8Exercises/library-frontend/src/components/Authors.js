  
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries';

const Authors = (props) => {
  const [authorName, setAuthorName] = useState('');  
  const [date, setDate] = useState('');
  // query the server for the authors -> save it in an array 
  const allAuthorsResult = useQuery(ALL_AUTHORS);

  const [updateBirthyear, updateBirthyearResult] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
  });
  

  if (!props.show) {
    return null
  }

  if (allAuthorsResult.loading) {
    return <div>loading... </div>
  }

  const submit = (event) => {
    event.preventDefault();
    updateBirthyear({ variables: { name: authorName, year: parseInt(date) }});

    setAuthorName('');
    setDate('');
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
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={authorName} onChange={({ target }) => setAuthorName(target.value)}>
            {authors.map((author) =>
              <option key={author.name} value={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          born <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
