/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { incrementLikes, showBlogDetail, deleteBlog } from '../reducers/blogReducer';

const Blog = (props) => {
  const dispatch = useDispatch();

  const {
    blog,
    currentUser,
  } = props;

  const [showDetail, setShowDetail] = useState(false);

  const handleShowHide = () => {
    setShowDetail(!showDetail);
    dispatch(showBlogDetail(showDetail));
  };

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
            {blog.likes}
            <button
              type="submit"
              onClick={() => dispatch(incrementLikes(blog))}
            >
              like
            </button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            {showDeleteButton(blog.id)}
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
        <button id="detail-button" onClick={handleShowHide}>{showDetail ? 'hide' : 'view'}</button>
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
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    passwordHash: PropTypes.string,
    blogs: PropTypes.object,
  }).isRequired,
};

export default Blog;
