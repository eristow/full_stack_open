import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef((props, ref) => {
  const children = props.children;
  const buttonLabel = props.buttonLabel;

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
        <button onClick={() => toggleVisibility(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        {children}
        <button onClick={() => toggleVisibility(false)}>Cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
