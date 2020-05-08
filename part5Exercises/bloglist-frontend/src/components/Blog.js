/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowHide = () => {
    setShowDetail(!showDetail);
  };

  // const addLike = (id, blog) => {
  //   const updateBlog = { ...blog };
  //   updateBlog.likes += 1;

  //   blogService.update(id, updateBlog);
  //   setNumOfLikes(numOfLikes + 1);
  // };

  const user = JSON.parse(localStorage.getItem('loggedBlogappUser'));

  const showDeleteButton = () => {
    if (user.username === blog.user.username) {
      return (
        <button type="button" onClick={deleteBlog}>delete</button>
      );
    }
  };

  const showExtraDetail = () => {
    if (showDetail) {
      return (
        <>
          <div>
            {blog.url}
          </div>
          <div className="likes">
            likes
            {' '}
            {blog.likes}
            <button
              type="submit"
              onClick={addLike}
            >
              like
            </button>
          </div>
          <div>
            {blog.user ? blog.user.name : 'No user assigned'}
          </div>
          <div>
            {showDeleteButton()}
          </div>
        </>
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

export default Blog;
