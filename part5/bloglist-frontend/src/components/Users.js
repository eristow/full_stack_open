import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { initializeUsers } from '../reducers/usersReducer';

const BlogCount = styled.td`
  float: right;
  padding: 10px;
`;
const Row = styled.tr`
  outline: solid thin;
  padding: 10px;
`;
const Cell = styled.td`
  padding: 10px;
`;
const Title = styled.h2`
  margin-bottom: 5px;
`;

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Title>Users</Title>
      <table>
        <thead>
          <Row>
            <Cell>
              <strong>Name</strong>
            </Cell>
            <Cell>
              <strong>Blogs Created</strong>
            </Cell>
          </Row>
        </thead>
        <tbody>
          {users.map(user => (
            <Row key={user.id}>
              <Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Cell>
              <BlogCount>{user.blogs.length}</BlogCount>
            </Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
