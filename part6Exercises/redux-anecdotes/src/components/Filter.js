import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    const filterInput = event.target.value;
    props.setFilter(filterInput);
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

const mapDispatchToProps = {
  setFilter,
};

export default connect(
  null,
  mapDispatchToProps,
)(Filter);
