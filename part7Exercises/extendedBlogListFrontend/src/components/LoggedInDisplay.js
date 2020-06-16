import React from 'react';
import { useDispatch } from 'react-redux';

import { logOutUser } from '../reducers/userReducer';

const LoggedInDisplay = ({ user }) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedBlogappUser');
  };

  return (
    <div className="userInfo">
      <p>
        {user.name}
        {' '}
        logged in
      </p>
      <button type="submit" onClick={() => logoutUser()}>logout</button>
    </div>
  );
};

export default LoggedInDisplay;
