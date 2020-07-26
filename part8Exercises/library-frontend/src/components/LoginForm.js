import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken }) => {
  // control username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // create mutation variable
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });
 

  // check if user is logged in, if so get token
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      // set the app token state to the returned token
      setToken(token);
      // add token to local storage
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data, setToken]);
  const loginSubmit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
