import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, setNotification, setIsError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      setUser(userLogin);
    } catch (exception) {
      setNotification('Wrong Credentials');
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setNotification(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
