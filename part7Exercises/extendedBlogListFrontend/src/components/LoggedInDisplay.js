import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Tabs,
  Tab,
  Paper,
  Button,
  makeStyles,
} from '@material-ui/core';

import { logOutUser } from '../reducers/userReducer';

// const LinkTab = (props) => (
//   <Tab
//     component="RouterLink"
//     onClick
// )

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    margin: theme.spacing(0.25),
    borderRadius: 16,
  },
}));

const LoggedInDisplay = ({ user }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutUser = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const wrapperDisplay = {
    display: 'flex',
  };

  return (
    <Paper square>
      <div style={wrapperDisplay}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value={0} label="Blogs" to="/" component={RouterLink} />
          <Tab value={1} label="Users" to="/users" component={RouterLink} />
        </Tabs>
        <div className={classes.root}>{`${user.name} logged in`}</div>
        <Button
          variant="outlined"
          color="secondary"
          type="submit"
          onClick={() => logoutUser()}
        >
          logout
        </Button>
      </div>
    </Paper>
  );
};

export default LoggedInDisplay;
