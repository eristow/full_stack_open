import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = ({ changeFilter }) => {
  const handleChange = e => {
    e.preventDefault();
    changeFilter(e.target.value);
  };

  const style = {
    marginTop: 5,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter,
};

export default connect(null, mapDispatchToProps)(Filter);
