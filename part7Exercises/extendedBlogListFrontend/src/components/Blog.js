/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deleteBlog } from '../reducers/blogReducer';

const Blog = (props) => {
  const dispatch = useDispatch();

  const {
    blog,
    currentUser,
  } = props;
  const showDeleteButton = (id) => {
    if (currentUser.username === blog.user.username) {
      return (
        <button
          id="delete-button"
          type="button"
          onClick={() => dispatch(deleteBlog(id))}
        >
          delete
        </button>
      );
    }
  };

  return (
    <div className="blog">
      <div className="blog-details">
        {blog.title}
        {' '}
        {blog.author}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.object,
    likes: PropTypes.number,
  }).isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    passwordHash: PropTypes.string,
    blogs: PropTypes.object,
  }).isRequired,
};

export default Blog;
