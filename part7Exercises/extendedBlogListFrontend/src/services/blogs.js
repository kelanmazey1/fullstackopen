import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const updateBlog = await axios.put(`${baseUrl}/${id}`, newObject, config);

  return updateBlog.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const blogToDelete = await axios.delete(`${baseUrl}/${id}`, config);

  return blogToDelete.data;
};

export default {
  getAll,
  setToken,
  createBlog,
  update,
  deleteBlog,
};
