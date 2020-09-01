import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

describe('<Note />', () => {
  let note;
  beforeEach(() => {
    note = {
      content: 'React-testing-library',
      important: true,
    };
  });

  test('Renders content', () => {
    // method 1
    const component = render(<Note note={note} toggleImportance={() => 0} />);

    // Print all HTML
    // component.debug();

    // Print <li> HTML
    // const li = component.container.querySelector('li');
    // console.log(prettyDOM(li));

    expect(component.container).toHaveTextContent('React-testing-library');

    // method 2
    const element = component.getByText('React-testing-library');
    expect(element).toBeDefined();

    // method 3
    const div = component.container.querySelector('.note');
    expect(div).toHaveTextContent('React-testing-library');
  });

  test('clicking the button calls event handler once', () => {
    const mockHandler = jest.fn();

    const component = render(
      <Note note={note} toggleImportance={mockHandler} />,
    );

    const button = component.getByText('make not important');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
