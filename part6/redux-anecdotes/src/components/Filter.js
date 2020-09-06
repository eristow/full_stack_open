import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    e.preventDefault();
    dispatch(changeFilter(e.target.value));
  };

  const style = {
    marginTop: 5,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
};

export default Filter;
