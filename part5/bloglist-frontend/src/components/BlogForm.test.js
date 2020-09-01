import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  const addBlog = jest.fn();
  let component;

  beforeEach(() => {
    component = render(<BlogForm addBlog={addBlog} />);
  });

  test('Should call the event handler with correct details when submit button clicked', () => {
    const titleInput = component.container.querySelector('#title');
    fireEvent.change(titleInput, {
      target: { value: 'Test Title' },
    });
    const authorInput = component.container.querySelector('#author');
    fireEvent.change(authorInput, {
      target: { value: 'Test Author' },
    });
    const urlInput = component.container.querySelector('#url');
    fireEvent.change(urlInput, {
      target: { value: 'Test Url' },
    });
    const form = component.container.querySelector('form');
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe('Test Title');
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author');
    expect(addBlog.mock.calls[0][0].url).toBe('Test Url');
  });
});
