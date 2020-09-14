import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { setNotification } from './reducers/notificationReducer';
import { likeBlog } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import Notification from './components/Notification';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import User from './components/User';
import BlogDetails from './components/BlogDetails';
import Blogs from './components/Blogs';
import Nav from './components/Nav';

const Container = styled.div`
  max-width: calc(800px);
  margin: 0px auto;
  display: flex;
  min-height: 100%;
  padding: 0px 16px;
  flex-direction: column;
`;
const Title = styled.h1`
  margin-bottom: 0px;
`;

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const like = async newBlog => {
    try {
      dispatch(likeBlog(newBlog));
    } catch (exception) {
      console.log('error:', exception);
      dispatch(setNotification('There was a problem liking this blog', 5));
    }
  };

  return (
    <Container>
      <Nav user={user} />
      <Title>Blogs</Title>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <Switch>
          <Route exact path="/">
            <Blogs />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails like={like} userId={user.id} />
          </Route>
        </Switch>
      )}
    </Container>
  );
};

export default App;
