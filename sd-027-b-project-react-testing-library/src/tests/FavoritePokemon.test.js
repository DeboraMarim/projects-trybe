import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testes em FavoritePokemon.js', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const msg = screen.getByText('No favorite Pokémon found');
    expect(msg).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', async () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    userEvent.click(details);

    const favorite = screen.getByRole(/checkbox/i);
    userEvent.click(favorite);

    const link = screen.getByRole(/link/i, { name: 'Favorite Pokémon' });
    userEvent.click(link);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
  });
});
