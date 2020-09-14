import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0px 10px 10px 10px;
`;
const Button = styled.button`
  margin-bottom: 5px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 5px;
  background: lightgray;
`;
const Input = styled.input`
  margin: 0px 5px;
  border-radius: 3px;
  border: 1px solid black;
  padding: 3px;
`;
const Label = styled.label``;

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
    <Container>
      <form onSubmit={handleSubmit}>
        <table style={{ width: '100px' }}>
          <tbody>
            <tr>
              <td>
                <Label>Table:</Label>
              </td>
              <td>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={handleTitleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label>Author:</Label>
              </td>
              <td>
                <Input
                  id="author"
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label>Author:</Label>
              </td>
              <td>
                <Input
                  id="author"
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label>Url:</Label>
              </td>
              <td>
                <Input id="url" value={newUrl} onChange={handleUrlChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit" id="blog-submit">
          Save
        </Button>
      </form>
    </Container>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
