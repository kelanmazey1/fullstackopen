/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { addNewBlog } from '../reducers/blogReducer';

const BlogForm = (props) => {
  const {
    toggleVisibility,
    currentUser,
  } = props;

  const dispatch = useDispatch();

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
    // this is here from testing, leaving it here just in case I need to test again props.mockAddBlog();

    dispatch(addNewBlog(newBlog));

    dispatch(setNotification({
      text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      error: false,
    }));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Author">Author: </label>
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="URL">URL: </label>
          <input
            data-testid="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
