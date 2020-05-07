/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowHide = () => {
    setShowDetail(!showDetail);
  };

  const addLike = (id, blog) => {
    const updatedBLog = {
      ...blog,
      likes: blog.likes + 1,
    }
    
    blogService.update(id, updatedBLog);
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
              type="button"
              onClick={() => addLike(blog.id, blog)}>
              like
            </button>
          </div>
          <div>
            {blog.user ? blog.user.name : 'No user assigned'}
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
