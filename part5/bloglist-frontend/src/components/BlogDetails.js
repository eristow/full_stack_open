import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  initializeBlogs,
  removeBlog,
  addComment,
} from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogDetails = ({ like, userId }) => {
  const [comment, setComment] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(blog => blog.id === id);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!blog) {
    return null;
  }

  const showDelete = userId === blog.user.id;

  const handleLike = () => {
    like({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog.id));
        dispatch(
          setNotification(`Removed blog ${blog.title} by ${blog.author}.`, 5),
        );
        setShouldRedirect(true);
      } catch (exception) {
        console.log('error:', exception);
        dispatch(setNotification('There was a problem deleting this blog', 5));
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newBlog = { ...blog, comments: [...blog.comments, comment] };
    dispatch(addComment(newBlog));
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button type="button" onClick={handleLike}>
          Like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      {showDelete && (
        <button type="button" id="delete-button" onClick={handleDelete}>
          remove
        </button>
      )}
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={`comment${i}`}>{comment}</li>
        ))}
      </ul>
      {shouldRedirect && <Redirect to="/" />}
    </div>
  );
};

BlogDetails.propTypes = {
  like: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default BlogDetails;
