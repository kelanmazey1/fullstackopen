/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';

import {
  ListItem,
} from '@material-ui/core';

const Blog = (props) => {
  const {
    blog,
  } = props;
  // const showDeleteButton = (id) => {
  //   if (currentUser.username === blog.user.username) {
  //     return (
  //       <button
  //         id="delete-button"
  //         type="button"
  //         onClick={() => dispatch(deleteBlog(id))}
  //       >
  //         delete
  //       </button>
  //     );
  //   }
  // };

  return (
    <ListItem>
      <div className="blog-details">
        {blog.title}
        {' '}
        {blog.author}
      </div>
    </ListItem>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
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
