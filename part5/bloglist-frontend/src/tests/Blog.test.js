import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/BlogListing';

describe('<Blog />', () => {
  const blog = {
    title: 'Test Title',
    author: 'Author Name',
    url: 'http://www.blogUrl.com',
    likes: 5,
    user: {
      name: 'User Name',
    },
  };
  const like = jest.fn();
  const showDelete = false;
  const deleteBlog = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        like={like}
        showDelete={showDelete}
        deleteBlog={deleteBlog}
      />,
    );
  });

  test('Should render blog title and author, but not url or likes', () => {
    expect(component.container).toHaveTextContent('Test Title');
    expect(component.container).toHaveTextContent('Author Name');
    expect(component.container).not.toHaveTextContent('http://www.blogUrl.com');
    expect(component.container).not.toHaveTextContent('5');
  });

  test('Should render url and likes when button clicked', () => {
    const button = component.getByText('show');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('http://www.blogUrl.com');
    expect(component.container).toHaveTextContent('5');
  });

  test('Should call the event handler twice when like button clicked twice', () => {
    let button = component.getByText('show');
    fireEvent.click(button);

    button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(like.mock.calls).toHaveLength(2);
  });
});
