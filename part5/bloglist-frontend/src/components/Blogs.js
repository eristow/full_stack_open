import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setNotification } from '../reducers/notificationReducer';
import { initializeBlogs, createBlog } from '../reducers/blogReducer';
import BlogListing from './BlogListing';
import BlogForm from './BlogForm';
import Toggleable from './Toggleable';

const FormTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const addBlog = async blog => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blog));
      dispatch(
        setNotification(
          `A new blog "${blog.title}" by ${blog.author} has been added.`,
          5000,
        ),
      );
    } catch (exception) {
      console.log('error:', exception);
      dispatch(setNotification('Error creating new blog', 5));
    }
  };

  return (
    <div>
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <FormTitle>Create New Blog</FormTitle>
        <BlogForm addBlog={addBlog} />
      </Toggleable>
      <div id="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <BlogListing key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
