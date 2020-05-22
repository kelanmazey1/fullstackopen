import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterInput = event.target.value;
    dispatch(setFilter(filterInput));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input type="text" name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
