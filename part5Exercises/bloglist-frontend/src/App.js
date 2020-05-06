/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const blogFormRef = React.createRef();

  const logoutUser = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const concatNewBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
  };

  return (
    <div>
      { user === null
        ? (
          <div>
            <Notification notification={notification} isError={isError} />
            <LoginForm
              setUser={setUser}
              setNotification={setNotification}
              setIsError={setIsError}
            />
          </div>
        )
        : (
          <div>
            <p>
              {user.name}
              {' '}
              logged in
            </p>
            <button type="submit" onClick={() => logoutUser()}>logout</button>

            <h2>blogs</h2>
            <Notification notification={notification} isError={isError} />
            <h2>Create new</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                toggleVisibility={() => blogFormRef.current.toggleVisibility()}
                concatNewBlog={concatNewBlog}
                setNotification={setNotification}
                setIsError={setIsError}
              />
            </Togglable>
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
          </div>
        )}
    </div>
  );
};

export default App;
