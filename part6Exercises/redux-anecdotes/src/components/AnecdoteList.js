import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';


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
let timer;

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddVote = (id, content) => {
    dispatch(setNotification(`You voted '${content}'`));
    dispatch(addVote(id));
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => dispatch(removeNotification()), 5000);
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
            handleClick={() => handleAddVote(anecdote.id, anecdote.content)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
