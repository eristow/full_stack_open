import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setErrorMessage('Successfully logged out.');
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addBlog = async blog => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(
        `A new blog "${blog.title}" by ${blog.author} has been added.`,
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('error:', exception);
      setErrorMessage('Error creating new blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const login = async potentialUser => {
    try {
      const user = await loginService.login(potentialUser);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setErrorMessage('Successfully logged in.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setUser(user);
    } catch (exception) {
      console.log('error:', exception);
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const like = async newBlog => {
    try {
      const updatedBlog = await blogService.update(newBlog.id, newBlog);
      setBlogs(
        blogs.map(blog => (blog.id !== newBlog.id ? blog : updatedBlog)),
      );
    } catch (exception) {
      console.log('error:', exception);
      setErrorMessage('There was a problem liking this blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async toDeleteBlog => {
    try {
      await blogService.remove(toDeleteBlog.id);
      setBlogs(blogs.filter(blog => blog.id !== toDeleteBlog.id));
    } catch (exception) {
      console.log('error:', exception);
      setErrorMessage('There was a problem deleting this blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm login={login} />
      ) : (
        <div>
          <p>
            {`${user.name} logged in`}
            <button type="button" onClick={() => handleLogout()}>
              Log Out
            </button>
          </p>
          <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
            <h2>Create New Blog</h2>
            <BlogForm addBlog={addBlog} />
          </Toggleable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                like={like}
                showDelete={user.id === blog.user.id}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
