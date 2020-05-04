/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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

  const setLoggedUser = (loggedUser) => {
    setUser(loggedUser);
  };

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
        ? <LoginForm setLoggedUser={setLoggedUser} />
        : (
          <div>
            <p>
              {user.name}
              {' '}
              logged in
            </p>
            <button type="submit" onClick={() => logoutUser()}>logout</button>
            <h2>Create new</h2>
            <BlogForm concatNewBlog={concatNewBlog} />
            <h2>blogs</h2>
            {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
          </div>
        )}
    </div>
  );
};

export default App;
