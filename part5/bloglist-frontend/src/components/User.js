import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/usersReducer';

const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === id);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
