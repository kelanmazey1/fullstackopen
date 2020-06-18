import React from 'react';
import { useDispatch } from 'react-redux';

import { incrementLikes, addCommentAction } from '../reducers/blogReducer';

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const createID = () => Math.random() * 1000;

  const addComment = (blogToAddCommentTo) => (event) => {
    event.preventDefault();
    const commentContent = event.target.comment.value;
    dispatch(addCommentAction(blogToAddCommentTo, commentContent));
    // eslint-disable-next-line no-param-reassign
    event.target.comment.value = '';
  };

  return (
    blog
      ? (
        <div>
          <h2>{blog.title}</h2>
          <a
            href={`https://${blog.url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
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
            <div>
              <h3>comments</h3>
              <form onSubmit={addComment(blog)}>
                <input type="text" name="comment" />
                <button type="submit">add comment</button>
              </form>
              <ul>
                {blog.comments.map((comment) => (
                  <li key={createID()}>
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
      : (
        null
      )
  );
};

export default BlogDetail;
