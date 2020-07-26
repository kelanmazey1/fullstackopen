import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries';

const BirthyearForm = () => {
  const [authorName, setAuthorName] = useState('');  
  const [date, setDate] = useState('');

  const allAuthorsResult = useQuery(ALL_AUTHORS, {
    onCompleted: (result) => {
      // this is so that the authorName state initializes correctly after the query is called
      setAuthorName(result.allAuthors[0].name);
    },
  });

  const authors = allAuthorsResult.data.allAuthors;

  const [updateBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      // same as above
      setAuthorName(authors[0].name);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors, response.data.editAuthor ]
        }
      })
    }
    
  });

  if (allAuthorsResult.loading) {
    return <div>loading... </div>
  }

  const submit = (event) => {
    event.preventDefault();
    updateBirthyear({ variables: { name: authorName, year: parseInt(date) }});
    setAuthorName('');
    setDate('');
  }

  

  return (
    <div>
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
  );
}

export default BirthyearForm;

