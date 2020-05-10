/* eslint-disable no-restricted-globals */
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

  // const addLike = async (id) => {
  //   const blog = blogs.find((b) => b.id === id);

  //   const updatedBlog = { ...blog, likes: blog.likes + 1 };

  //   await blogService.update(id, updatedBlog);

  //   setNumberOfLikes(numberOfLikes + 1);
  // };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    // eslint-disable-next-line no-alert
    if (confirm(
      `Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}`,
    )) {
      await blogService.deleteBlog(id);
      const remainingBlogs = await blogService.getAll();
      setBlogs(remainingBlogs);
    }
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
                currentUser={user}
              />
            </Togglable>
            {blogs
              .sort((a, b) => (a.likes > b.likes ? -1 : 1))
              .map(
                (blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    blogs={blogs}
                    deleteBlog={() => deleteBlog(blog.id)}
                    currentUser={user}
                  />
                ),
              )}
            )
          </div>
        )}
    </div>
  );
};

export default App;
