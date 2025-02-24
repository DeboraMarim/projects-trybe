import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import AppliedFilters from './AppliedFilters';
import OrderPlanets from './ OrderPlanets';
import Table from './Table';

function Filtros() {
  const optionsComparison = ['maior que', 'menor que', 'igual a'];
  const optionsDaVez = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  function applyAllFilters(array, filters) {
    return filters.reduce((result, { column, comparison, value }) => {
      const operations = {
        'maior que': (a, b) => a > +b,
        'menor que': (a, b) => a < +b,
        'igual a': (a, b) => a === b,
      };

      const operation = operations[comparison];
      return result.filter((element) => operation(element[column], value));
    }, array);
  }
  const filterArrayByType = (planets, column, comparison, value) => {
    const operations = {
      'maior que': (a, b) => a > +b,
      'menor que': (a, b) => a < +b,
      'igual a': (a, b) => a === b,
    };

    const operation = operations[comparison];
    const filteredArray = planets.filter((element) => operation(element[column], value));

    return filteredArray;
  };

  const {
    planets,
    planetsSelected,
    setPlanetsSelected,
    data,
    setData,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterValues,
    setfilterValues,
    typeSort,
    sortcolumn,
  } = useContext(PlanetsContext);

  const checkFiltersOptions = () => {
    const checkFilters = planetsSelected.length !== 0 ? planetsSelected : planets;
    setData(data.filter((options) => options !== column));
    setPlanetsSelected(filterArrayByType(checkFilters, column, comparison, value));
    setValue(0);
    setComparison('maior que');
    setColumn('population');
  };

  const createFilters = () => {
    setfilterValues((filterNumbers) => [...filterNumbers, {
      column: column.toLowerCase(),
      comparison: comparison.toLowerCase(),
      value,
    }]);

    checkFiltersOptions();
  };

  const checkPlanetsSelected = useMemo(() => {
    if (filterValues.length === 0) {
      return planets;
    }
    return applyAllFilters(planets, filterValues);
  }, [filterValues, planets]);

  const checkFiltersByNumeric = useCallback(() => {
    setPlanetsSelected(checkPlanetsSelected);
  }, [checkPlanetsSelected, setPlanetsSelected]);

  useEffect(() => {
    checkFiltersByNumeric();
  }, [checkFiltersByNumeric, filterValues]);

  const removeFilter = (columnParam) => {
    setData((prevState) => [...prevState, columnParam]);
    setfilterValues(filterValues
      .filter((objetoFilter) => objetoFilter.column !== columnParam));
  };
  const removeAllFilters = () => {
    setfilterValues([]);
    setData(optionsDaVez);
  };

  const order = () => {
    const NEGATIVE_NUMBER = -1;
    const sortOrder = typeSort === 'ASC' ? 1 : NEGATIVE_NUMBER;

    let sortedPlanets = planetsSelected.length !== 0 ? planetsSelected : planets;

    if (sortcolumn !== 'population') {
      sortedPlanets = sortedPlanets
        .sort((a, b) => sortOrder * (Number(a[sortcolumn]) - Number(b[sortcolumn])));
    } else {
      const unknownPopulation = sortedPlanets
        .filter((planet) => planet.population === 'unknown');
      const knownPopulation = sortedPlanets
        .filter((planet) => planet.population !== 'unknown');

      sortedPlanets = [
        ...knownPopulation
          .sort((a, b) => sortOrder * (Number(a.population) - Number(b.population))),
        ...unknownPopulation,
      ];
    }
    setPlanetsSelected([...sortedPlanets]);
  };
  const [searchName, setSearchName] = useState('');

  const filteredByName = useCallback(() => {
    if (searchName !== '') {
      setPlanetsSelected(planets
        .filter((planet) => planet.name.toLowerCase()
          .includes(searchName.toLowerCase())));
    } else {
      setPlanetsSelected(planets);
    }
  }, [searchName, planets, setPlanetsSelected]);

  useEffect(() => {
    filteredByName();
  }, [filteredByName, searchName]);

  return (
    <section>
      <div>
        <form>
          <label htmlFor="options">
            <select
              name="options"
              id="options"
              data-testid="column-filter"
              value={ column }
              onChange={ ({ target }) => setColumn(target.value) }
            >
              {data.map((option) => (
                <option value={ option } key={ option }>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="comparison">
            <select
              name="comparison"
              id="comparison"
              data-testid="comparison-filter"
              value={ comparison }
              onChange={ ({ target }) => setComparison(target.value) }
            >
              {optionsComparison.map((option) => (
                <option key={ option } value={ option }>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="value">
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-filter"
              value={ value }
              onChange={ ({ target }) => setValue(target.value) }
            />
          </label>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ createFilters }
          >
            Filter
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ removeAllFilters }
          >
            Remove Filters
          </button>
          <OrderPlanets order={ order } />
          <AppliedFilters removeFilter={ removeFilter } />
        </form>
      </div>
      <div>
        <input
          type="text"
          name="searchName"
          id="searchName"
          data-testid="name-filter"
          placeholder="search by name"
          value={ searchName }
          onChange={ ({ target }) => setSearchName(target.value.toLowerCase()) }
        />
      </div>
      <div>
        <Table />
      </div>
    </section>
  );
}

export default Filtros;
