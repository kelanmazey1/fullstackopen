import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import { setTimedNotification } from '../reducers/notificationReducer';


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
        has
        {' '}
        {votes}
        <button type="button" onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};
// this is here so it doesn't reset each time the list renders
// let timer;

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddVote = (anecdote) => {
    dispatch(setTimedNotification(`You voted '${anecdote.content}'`, 5));
    dispatch(addVote(anecdote));
  };

  return (
    <div>
      {anecdotes
        .filter((a) => a.content.includes(filter))
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick={() => handleAddVote(anecdote, anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
