import React, { useState } from 'react';
import { useMutation, useSubscription } from '@apollo/client';

import { ADD_BOOK, GET_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries';


const NewBook = ({ updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addNewBook, result] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { showRecommended: false } }, { query: ALL_AUTHORS }],
    awaitRefetchQueries: true,
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added`);
      updateCacheWith(subscriptionData.data.bookAdded);
    }
  })

  if (result.loading) { return <div>getting tired of loading...</div>}

  const submit = async (event) => {
    event.preventDefault();

    addNewBook({ variables: {
      title,
      author,
      published: parseInt(published),
      genres
    }});

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook;