import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    addBlog(blog);
    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
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
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block' }}>
          Title:
          <input id="title" value={newTitle} onChange={handleTitleChange} />
        </label>
        <label style={{ display: 'block' }}>
          Author:
          <input id="author" value={newAuthor} onChange={handleAuthorChange} />
        </label>
        <label style={{ display: 'block' }}>
          Url:
          <input id="url" value={newUrl} onChange={handleUrlChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
