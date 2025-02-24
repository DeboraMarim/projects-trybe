import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes em App.js', () => {
  it('É exibido na tela um link com o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
  });
  it('É exibido na tela um link com o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
  });
  it('É exibido na tela um link com o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />);

    history.push('/LinkQuebrado');

    expect(await screen.findByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
});
