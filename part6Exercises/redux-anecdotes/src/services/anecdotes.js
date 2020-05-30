import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObject);
  return response.data;
};

const addVote = async (anecdote) => {
  // send put request with same data +1 vote
  const anecdoteWithVoteAdded = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return anecdoteWithVoteAdded.data;
};
export default {
  getAll,
  createNew,
  addVote,
};
