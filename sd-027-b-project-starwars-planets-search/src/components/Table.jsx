import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function Table() {
  const headers = [
    'Name',
    'RotationPeriod',
    'OrbitalPeriod',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'SurfaceWater',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];
  const { planets, planetsSelected } = useContext(PlanetsContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(planetsSelected.length !== 0 ? planetsSelected : planets)?.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films[0]}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
