const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  anecdote,
  id: getId(),
  votes: 0,
});

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
  data: anecdotes.map((anecdote) => ({ ...anecdote, id: getId(), votes: 0 }))
});

export const createNewAnecdote = (content) => ({
  type: 'ADD_ANECDOTE',
  data: asObject(content),
});

export const addVote = (id) => ({
  type: 'ADD_VOTE',
  data: { id },
});

export default reducer;
