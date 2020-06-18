import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Tabs,
  Tab,
  Paper,
  Button,
} from '@material-ui/core';

import { logOutUser } from '../reducers/userReducer';

// const LinkTab = (props) => (
//   <Tab
//     component="RouterLink"
//     onClick
// )

const LoggedInDisplay = ({ user }) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedBlogappUser');
  };

  return (
    <Paper square>
      <Tabs>
        <Tab label="Blogs" to="/" component={RouterLink} />
        <Tab label="Users" to="/users" component={RouterLink} />
        <Tab label={`${user.name} logged in`} className="userInfo" />
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          onClick={() => logoutUser()}
        >
          logout
        </Button>
      </Tabs>
    </Paper>
  );
};

export default LoggedInDisplay;
