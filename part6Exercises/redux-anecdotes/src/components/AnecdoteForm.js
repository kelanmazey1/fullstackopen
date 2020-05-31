import React from 'react';
import { connect } from 'react-redux';

import { createNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    props.createNewAnecdote(content);
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

const mapDispatchToProps = {
  createNewAnecdote,
};

export default connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm);
