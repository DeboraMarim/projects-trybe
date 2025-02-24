import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../Context/PlanetsContext';

function OrderPlanets({ order }) {
  const optionsColumnNew = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const {
    setTypeSort,
    sortcolumn,
    setSortcolumn,
  } = useContext(PlanetsContext);
  return (
    <div>
      <label htmlFor="column">
        <select
          name="order"
          id="column"
          data-testid="column-sort"
          value={ sortcolumn }
          onChange={ ({ target }) => setSortcolumn(target.value) }
        >
          {optionsColumnNew.map((option) => (
            <option value={ option } key={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="sort">
        <input
          type="radio"
          name="sort"
          id="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setTypeSort(target.value) }
        />
        Ascendente
      </label>
      <label htmlFor="sortD">
        <input
          type="radio"
          name="sortD"
          id="sortD"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setTypeSort(target.value) }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ order }
      >
        Order
      </button>
    </div>
  );
}

OrderPlanets.propTypes = {
  order: PropTypes.func.isRequired,
};

export default OrderPlanets;
