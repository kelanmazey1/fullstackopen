import React from 'react';
import { useDispatch } from 'react-redux';

import { createNewAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createNewAnecdote(newAnecdote));
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default AnecdoteForm;
