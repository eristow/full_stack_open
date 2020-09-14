import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  margin: 5px;
  margin-left: 0px;
  border-radius: 3px;
  border: 1px solid black;
  background: lightgray;
  padding: 5px;
`;

const Toggleable = React.forwardRef((props, ref) => {
  const { children, buttonLabel } = props;

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={() => toggleVisibility(true)}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={() => toggleVisibility(false)}>Cancel</Button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  children: PropTypes.array.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
