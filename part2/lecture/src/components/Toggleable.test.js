import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggleable from './Toggleable';

describe('<Toggleable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel="Show">
        <div className="testDiv" />
      </Toggleable>,
    );
  });

  test('Renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('Children are not displayed at start', () => {
    const div = component.container.querySelector('.toggleableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('Children are displayed after clicking button', () => {
    const button = component.getByText('Show');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('Toggled content can be closed', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const closeButton = component.getByText('Cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });
});
