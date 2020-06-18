import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';

import loginService from '../services/login';

import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const marginBottom = {
    marginBottom: '0.5em',
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userLogin = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userLogin),
      );
      setUsername('');
      setPassword('');
      dispatch(setUser(userLogin));
    } catch (exception) {
      dispatch(setNotification({
        text: 'Wrong Credentials',
        error: true,
      }));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };
  return (
    <div>
      <Typography variant="h3" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            placeholder="username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            placeholder="password"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={marginBottom}
          />
        </div>
        <Button
          id="login-button"
          type="submit"
          size="small"
          variant="outlined"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
