/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { setUser, logOutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, [dispatch]);

  const blogFormRef = React.createRef();

  const logoutUser = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedBlogappUser');
  };

  return (
    <div>
      { user === null
        ? (
          <div className="loginInfo">
            <Notification />
            <LoginForm />
          </div>
        )
        : (
          <div>
            <div className="userInfo">
              <p>
                {user.name}
                {' '}
                logged in
              </p>
              <button type="submit" onClick={() => logoutUser()}>logout</button>
            </div>
            <div className="title">
              <h2>blogs</h2>
              <Notification notification={notification.text} isError={notification.error} />
            </div>
            <div className="blogs">
              <h2>Create new</h2>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm
                  toggleVisibility={() => blogFormRef.current.toggleVisibility()}
                />
              </Togglable>
              {blogs
                // sort the blogs by number of likes
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map(
                  (blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      currentUser={user}
                    />
                  ),
                )}
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
