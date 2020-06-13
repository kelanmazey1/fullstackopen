/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  console.log('this is blogs after useSelector', blogs);
  // const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const [oldBlogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

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

  console.log(user);

  return (
    <div>
      { user === null
        ? (
          <div className="loginInfo">
            <Notification notification={notification.text} isError={notification.error} />
            <LoginForm
              setUser={setUser}
            />
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
                  concatNewBlog={concatNewBlog}
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
            </div>
          </div>
        )}
    </div>
  );
};

export default App;
