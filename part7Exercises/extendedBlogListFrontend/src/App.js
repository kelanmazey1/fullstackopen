/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Switch,
  useRouteMatch,
  Link,
} from 'react-router-dom';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoggedInDisplay from './components/LoggedInDisplay';
import UsersInfo from './components/UsersInfo';
import UserInfo from './components/UserInfo';
import BlogInfo from './components/BlogInfo';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { initUserInfo } from './reducers/usersInfoReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const usersInfo = useSelector((state) => state.usersInfo);
  const blogs = useSelector((state) => state.blog);
  const notification = useSelector((state) => state.notification);
  // using layout effect as the component was returning the login form
  // then quickly logging in the user, this way the screen is blank for 1 second
  // but that's better than the log in form showing
  useLayoutEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, [dispatch]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUserInfo());
  }, [dispatch]);

  const userMatch = useRouteMatch('/users/:id');
  const userInfo = userMatch
    ? usersInfo.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useRouteMatch('/blogs/:id');
  const blogInfo = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const blogFormRef = React.createRef();

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
            <LoggedInDisplay user={user} />
            <div className="title">
              <h2>blogs</h2>
              <Notification notification={notification.text} isError={notification.error} />
            </div>
            <Switch>
              <Route path="/users/:id">
                <UserInfo user={userInfo} />
              </Route>
              <Route path="/users">
                <UsersInfo users={usersInfo} />
              </Route>
              <Route path="/blogs/:id">
                <BlogInfo blog={blogInfo} />
              </Route>
              <Route path="/">
                <div>
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
                          <Link key={blog.id} to={`/blogs/${blog.id}`}>
                            <Blog
                              blog={blog}
                              currentUser={user}
                            />
                          </Link>
                        ),
                      )}
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        )}
    </div>
  );
};

export default App;
