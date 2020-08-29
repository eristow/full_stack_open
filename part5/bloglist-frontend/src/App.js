import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    setErrorMessage('Successfully logged out.');
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <div>
          <p>
            {`${user.username} logged in`}
            <button type="button" onClick={() => handleLogout()}>
              Log Out
            </button>
          </p>
          <h2>Create New Blog</h2>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
          />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
