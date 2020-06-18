import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOutUser } from '../reducers/userReducer';

const LoggedInDisplay = ({ user }) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const navBarContainer = {
    backgroundColor: 'lightgray',
    width: '100%',
  };

  const navBarElements = {
    paddingLeft: '0.2em',
    paddingRight: '0.2em',
    display: 'inline-block',
  };

  return (
    <div style={navBarContainer}>
      <Link style={navBarElements} to="/">blogs</Link>
      <Link style={navBarElements} to="/users">users</Link>
      <div style={navBarElements} className="userInfo">
        <p>
          {user.name}
          {' '}
          logged in
        </p>
      </div>
      <button style={navBarElements} type="submit" onClick={() => logoutUser()}>logout</button>
    </div>
  );
};

export default LoggedInDisplay;
