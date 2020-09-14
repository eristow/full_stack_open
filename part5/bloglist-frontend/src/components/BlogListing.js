import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Content = styled.div`
  padding: 10px;
  border: solid black 1px;
  margin-bottom: 5px;
`;
const CommentCount = styled.p`
  float: right;
  margin: 0px;
`;

const BlogListing = ({ blog }) => {
  return (
    <Content>
      <div className="blogContent">
        <span id="blog-title-author">
          <Link to={`/blogs/${blog.id}`}>
            <strong>{blog.title}</strong> by <strong>{blog.author}</strong>
          </Link>
        </span>
        <CommentCount>Comments: {blog.comments.length}</CommentCount>
      </div>
    </Content>
  );
};

BlogListing.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogListing;
