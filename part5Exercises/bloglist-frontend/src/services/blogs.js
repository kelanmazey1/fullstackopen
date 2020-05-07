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
    console.log('like has been added woooo');

    const config = {
      headers: { Authorization: token},
    };

    const updateBlog = await axios.put(`${baseUrl}/${id}`, newObject, config)

    console.log(updateBlog);
  }

export default {
  getAll,
  setToken,
  createBlog,
  update,
};
