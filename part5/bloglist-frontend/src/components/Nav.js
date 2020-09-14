import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const NavBar = styled.div`
  background: lightgray;
  padding: 5px;
  text-align: center;
  border: 2px solid black;
  border-radius: 3px;
`;
const UserInfo = styled.p`
  padding: 5px;
  display: inline;
`;
const NavButton = styled.button`
  margin: 0px 5px;
  border-radius: 3px;
  border: 1px solid black;
  background: white;
  padding: 5px;
  cursor: pointer;
  font-size: 15px;
`;
const NavContainer = styled.div`
  display: inline;
  float: left;
`;
const UserContainer = styled.div`
  display: inline;
  float: right;
`;

const Nav = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setNotification('Successfully logged out.', 5));
  };

  if (!user) {
    return null;
  }

  return (
    <NavBar>
      <NavContainer>
        <Link to="/">
          <NavButton>Blogs</NavButton>
        </Link>
        <Link to="/users">
          <NavButton>Users</NavButton>
        </Link>
      </NavContainer>
      <UserContainer>
        <UserInfo>
          <strong>{user.name}</strong> logged in.
        </UserInfo>
        <NavButton
          type="button"
          id="logout-button"
          onClick={() => handleLogout()}
        >
          Log Out
        </NavButton>
      </UserContainer>
    </NavBar>
  );
};

Nav.propTypes = {
  user: PropTypes.object,
};

export default Nav;
