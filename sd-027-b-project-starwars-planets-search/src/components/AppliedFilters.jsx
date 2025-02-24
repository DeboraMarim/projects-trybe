import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../Context/PlanetsContext';

function AppliedFilters({ removeFilter }) {
  const { filterValues } = useContext(PlanetsContext);
  return (
    <div>
      <h2>Filtros:</h2>
      {filterValues?.map((filter) => (
        <div
          key={ filter.column }
          data-testid="filter"
        >
          {`${filter.column} - ${filter.comparison} - ${filter.value}`}
          <button type="button" onClick={ () => removeFilter(filter.column) }>X</button>
        </div>
      ))}
    </div>
  );
}

AppliedFilters.propTypes = {
  removeFilter: PropTypes.func.isRequired,
};

export default AppliedFilters;
