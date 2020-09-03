import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, like, showDelete, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid black 1px',
    marginBottom: 5,
  };

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    like({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div className="blogContent">
        <span id="blog-title-author">{blog.title} {blog.author}</span>
        <button type="button" id="show-details-button" onClick={toggleShowDetails}>
          {showDetails ? 'hide' : 'show'}
        </button>
      </div>
      {showDetails ? (
        <div className="blogDetails">
          <span id="blog-url">{blog.url}</span>
          <br />
          <span id="blog-likes">{`likes ${blog.likes}`}</span>
          <button type="button" id="like-button" onClick={handleLike}>
            like
          </button>
          <br />
          {blog.user.name}
          <br />
          {showDelete ? (
            <button type="button" id="delete-button" onClick={handleDelete}>
              remove
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
