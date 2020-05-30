import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE': {
      const { id } = action.data;
      const anecdoteToAddVoteTo = state.find((a) => a.id === id);
      const anecdoteVoteAdded = {
        ...anecdoteToAddVoteTo,
        votes: anecdoteToAddVoteTo.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : anecdoteVoteAdded));
    }
    case 'ADD_ANECDOTE':
      return [...state, action.data];

    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes.map((anecdote) => ({
    ...anecdote,
    votes: anecdote.votes ? anecdote.votes : 0,
  })),
});

export const createNewAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch({
    type: 'ADD_ANECDOTE',
    data: newAnecdote,
  });
};

export const addVote = (anecdote) => async (dispatch) => {
  const { id } = anecdote;
  await anecdoteService.addVote(anecdote);
  dispatch({
    type: 'ADD_VOTE',
    data: { id },
  });
};

export default reducer;
