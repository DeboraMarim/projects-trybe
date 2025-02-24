import {fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import mockData from "./mockData";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const URL_API = 'https://swapi.dev/api/planets';

beforeEach(() => {
  global.fetch = jest.fn(async () => ({
    json: async () => mockData,
  }));
})

describe('testing the api call, the various filters, add and remove filters and error', () => {
  it('testing the api call', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(URL_API);
  });
  it('checking the size of the table and if it is possible to filter by name', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(11);

    const namePlanet = await screen.findByText(/Dagobah/i)

    expect(namePlanet).toBeInTheDocument()

    const inputName = screen.getByTestId('name-filter');

    expect(inputName).toBeInTheDocument();

    userEvent.type(inputName, 'oo')
    act(() => {
      expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
    })
  })
  it('fetchPlanets should set error on network error', async () => {
    const mockError = new Error('Network error');
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject({
      json: () => Promise.reject(mockError),
    }));
    render(<App />)
    act(() => expect(mockError.message).toBe('Network error'))
  })
  it('testing the ordering of planets in ascending order', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();

    const selectOptions = screen.getByTestId('column-sort');
    const inputASC = screen.getByTestId('column-sort-input-asc');
    const btnOrder = screen.getByTestId('column-sort-button');

    expect(selectOptions).toBeInTheDocument();
    expect(inputASC).toBeInTheDocument();
    expect(btnOrder).toBeInTheDocument();

    userEvent.selectOptions(selectOptions, 'diameter');
    userEvent.click(inputASC);
    userEvent.click(btnOrder);

    const planetEndor = await screen.findByText(/endor/i);
    expect(planetEndor).toBeInTheDocument();
  })
  it('testing ordering planets in descending order', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();

    const selectOptions = screen.getByTestId('column-sort');
    const inputDESC = screen.getByTestId('column-sort-input-desc');
    const btnOrder = screen.getByTestId('column-sort-button');

    expect(selectOptions).toBeInTheDocument();
    expect(inputDESC).toBeInTheDocument();
    expect(btnOrder).toBeInTheDocument();

    userEvent.selectOptions(selectOptions, 'rotation_period');
    userEvent.click(inputDESC);
    userEvent.click(btnOrder);

    const planetKamino = await screen.findByText(/kamino/i);
    expect(planetKamino).toBeInTheDocument();
  })
  it('testing if it is possible to add and remove a filter', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();

    const value = screen.getByTestId('value-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const column = screen.getByTestId('column-filter')
    const addFilterBtn = screen.getByTestId('button-filter')

    expect(column).toBeInTheDocument();

    userEvent.selectOptions(column, 'surface_water')

    expect(column).toHaveValue('surface_water')
    expect(comparison).toBeInTheDocument();

    userEvent.selectOptions(comparison, 'menor que');

    expect(comparison).toHaveValue('menor que');
    expect(value).toBeInTheDocument();

    userEvent.clear(value);
    userEvent.type(value, '12');

    expect(value).toHaveValue(12)
    expect(addFilterBtn).toBeInTheDocument();
    act(() => fireEvent.click(addFilterBtn));

    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column, 'population');

    expect(column).toHaveValue('population');

    expect(comparison).toBeInTheDocument();

    userEvent.selectOptions(comparison, 'maior que');

    expect(comparison).toHaveValue('maior que');

    expect(value).toBeInTheDocument();

    userEvent.clear(value);
    userEvent.type(value, '200000');
    expect(value).toHaveValue(200000);


    act(() => fireEvent.click(addFilterBtn));

    expect(screen.getAllByRole('row')).toHaveLength(3);

    const removeFilter = screen.getAllByRole('button', { name: /x/i });
    expect(removeFilter[0]).toBeInTheDocument();
    act(() => fireEvent.click(removeFilter[0]))
    expect(screen.getAllByRole('row')).toHaveLength(7);

    const removeAllFilters = screen.getByTestId('button-remove-filters');
    act(() => fireEvent.click(removeAllFilters));
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })
  test('testing planet with surface_water equal to 12', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);
    expect(planets).toBeInTheDocument();

    const value = screen.getByTestId('value-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const column = screen.getByTestId('column-filter');
    const addFilterBtn = screen.getByTestId('button-filter');
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column, 'surface_water');
    expect(column).toHaveValue('surface_water');
    expect(comparison).toBeInTheDocument();
    userEvent.selectOptions(comparison, 'igual a');
    expect(comparison).toHaveValue('igual a');
    expect(value).toBeInTheDocument();
    userEvent.clear(value);
    userEvent.type(value, '12');
    expect(value).toHaveValue(12);
    act(() => fireEvent.click(addFilterBtn));
    expect(screen.getAllByRole('row')).toHaveLength(2);
  })

  it('testing if the array of planets is complete', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);
    expect(planets).toBeInTheDocument();
    const addFilterBtn = screen.getByTestId('button-filter');
    expect(addFilterBtn).toBeInTheDocument();
    act(() => fireEvent.click(addFilterBtn));
    expect(screen.getAllByRole('row')).toHaveLength(9);
  })
  it('testing if the array of planets is complete when clicking the sort button', async () => {
    render(<App />);
    const planets = await screen.findByText(/Tatooine/i);
    expect(planets).toBeInTheDocument();
    const btnOrder = screen.getByTestId('column-sort-button')
    expect(btnOrder).toBeInTheDocument();
    act(() => fireEvent.click(btnOrder));
    expect(screen.getAllByRole('row')).toHaveLength(11);
  })
})