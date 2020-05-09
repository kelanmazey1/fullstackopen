/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({
  concatNewBlog,
  setNotification,
  setIsError,
  toggleVisibility,
  currentUser,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    toggleVisibility();
    const newBlog = {
      title,
      author,
      url,
      user: currentUser.id,
    };

    const response = await blogService.createBlog(newBlog);

    concatNewBlog(response);
    setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setIsError(false);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="Title">Title: </label>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">Author: </label>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="URL">URL: </label>
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
