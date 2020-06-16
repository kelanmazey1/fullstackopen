import React from 'react';
import { useDispatch } from 'react-redux';

import { incrementLikes } from '../reducers/blogReducer';

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch();

  return (
    blog
      ? (
        <div>
          <h2>{blog.title}</h2>
          <a href={`https://${blog.url}`}>{blog.url}</a>
          <div>
            {blog.likes}
            {' '}
            likes
            <button
              type="submit"
              onClick={() => dispatch(incrementLikes(blog))}
            >
              like
            </button>
            <div>
              added by
              {blog.user.name}
            </div>
          </div>
        </div>
      )
      : (
        null
      )
  );
};

export default BlogInfo;
