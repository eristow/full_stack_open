import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = async e => {
    e.preventDefault();

    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(`A new blog "${newTitle}" by ${newAuthor} has been added.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
    } catch (exception) {
      console.log('error:', exception);
      setErrorMessage('Error creating new blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleTitleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleAuthorChange = e => {
    setNewAuthor(e.target.value);
  };

  const handleUrlChange = e => {
    setNewUrl(e.target.value);
  };

  return (
    <div style={{ paddingBottom: '10px' }}>
      <form onSubmit={addBlog}>
        <label style={{ display: 'block' }}>
          Title:
          <input value={newTitle} onChange={handleTitleChange} />
        </label>
        <label style={{ display: 'block' }}>
          Author:
          <input value={newAuthor} onChange={handleAuthorChange} />
        </label>
        <label style={{ display: 'block' }}>
          Url:
          <input value={newUrl} onChange={handleUrlChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
