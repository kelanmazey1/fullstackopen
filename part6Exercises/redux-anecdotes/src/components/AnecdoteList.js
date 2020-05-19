import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';

const Anecdote = (props) => {
  const {
    id,
    content,
    votes,
    handleClick,
  } = props;

  return (
    <div key={id}>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes
        .sort((a,b) => (a.votes > b.votes ? -1 : 1))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => dispatch(addVote(anecdote.id))}
          />)
      }
    </div>
  );
};

export default AnecdoteList;