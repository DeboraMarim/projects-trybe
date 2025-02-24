import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import getAPI from '../API/getAPI';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function PlanetsProvider({ children }) {
  const [planetsSelected, setPlanetsSelected] = useState([]);
  const [data, setData] = useState(options);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filterValues, setfilterValues] = useState([]);
  const [typeSort, setTypeSort] = useState('');
  const [sortcolumn, setSortcolumn] = useState('population');
  const URL_API = 'https://swapi.dev/api/planets';
  const { planets } = getAPI(URL_API);

  const context = useMemo(() => ({
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
    setTypeSort,
    sortcolumn,
    setSortcolumn,
  }), [
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
    setTypeSort,
    sortcolumn,
    setSortcolumn,
  ]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
