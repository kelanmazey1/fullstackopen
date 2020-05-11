/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import blogService from '../services/blogs';

const Blog = (props) => {
  const {
    blog,
    blogs,
    deleteBlog,
    currentUser,
  } = props;

  const [showDetail, setShowDetail] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(blog.likes);

  const handleShowHide = () => {
    setShowDetail(!showDetail);
  };

  const addLike = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id);

    const updatedBlog = { ...blogToUpdate, likes: numberOfLikes + 1 };

    blogService.update(id, updatedBlog);

    setNumberOfLikes(numberOfLikes + 1);
    // added to test if function is successfully called
    props.mockLike();
  };


  const showDeleteButton = () => {
    if (currentUser.username === blog.user.username) {
      return (
        <button type="button" onClick={deleteBlog}>delete</button>
      );
    }
  };

  const showExtraDetail = () => {
    if (showDetail) {
      return (
        <div className="extraDetail">
          <div className="url">
            {blog.url}
          </div>
          <div className="likes">
            likes
            {' '}
            {numberOfLikes}
            <button
              type="submit"
              onClick={() => addLike(blog.id)}
            >
              like
            </button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            {showDeleteButton()}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="blog">
      <div className="blog-details">
        {blog.title}
        {' '}
        {blog.author}
        <button onClick={handleShowHide}>{showDetail ? 'hide' : 'view'}</button>
      </div>
      {showExtraDetail()}
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
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    passwordHash: PropTypes.string,
    blogs: PropTypes.object,
  }).isRequired,
};

export default Blog;
