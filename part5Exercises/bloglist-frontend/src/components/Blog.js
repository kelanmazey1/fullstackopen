/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handleShowHide = () => {
    setShowDetail(!showDetail);
  };

  const showExtraDetail = () => {
    if (showDetail) {
      return (
        <>
          <div>
            {blog.url}
          </div>
          <div>
            likes
            {' '}
            {blog.likes}
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
