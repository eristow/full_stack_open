import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const Button = styled.button`
  margin: 5px;
  margin-left: 0px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 5px;
  background: lightgray;
`;
const Input = styled.input`
  margin: 0px 5px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 3px;
`;
const Label = styled.label``;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async potentialUser => {
    try {
      dispatch(loginUser(potentialUser));
      dispatch(setNotification('Successfully logged in.', 5));
    } catch (exception) {
      console.log('error:', exception);
      dispatch(setNotification('Wrong credentials', 5));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <Label>Username:</Label>
            </td>
            <td>
              <Input
                type="text"
                value={username}
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Label>Password:</Label>
            </td>
            <td>
              <Input
                type="password"
                value={password}
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="submit" id="login-submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
