import React from 'react';

const Filter = ({ filterText, handleFilterText }) => {
  return (
    <div>
      find countries <input value={filterText} onChange={handleFilterText} />
    </div>
  );
};

export default Filter;
