import React from 'react';
import { connect } from 'react-redux';

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

const AnecdoteList = (props) => {
  const { anecdotes } = props;
  const handleAddVote = (anecdote) => {
    props.setTimedNotification(`You voted '${anecdote.content}'`, 5);
    props.addVote(anecdote);
  };

  return (
    <div>
      {anecdotes
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

const mapStateToProps = (state) => ({
  anecdotes: state
    .anecdotes
    .filter((anecdote) => anecdote.content.includes(state.filter)),
});

const mapDispatchToProps = (dispatch) => ({
  setTimedNotification:
    (notification, seconds) => dispatch(setTimedNotification(notification, seconds)),
  addVote: (id) => dispatch(addVote(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);
