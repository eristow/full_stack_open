import React from 'react';

const Filter = ({filterText, handleFilterText}) => {
  return (
    <div>
      filter shown with <input value={filterText} onChange={handleFilterText} />
    </div>
  );
};

export default Filter;
