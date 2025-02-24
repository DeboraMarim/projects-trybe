import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes em Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const Name = screen.getByTestId('pokemon-name');
    const Type = screen.getByTestId('pokemon-type');
    const Weight = screen.getByTestId('pokemon-weight');
    const Img = screen.getByRole('img');

    expect(Name).toHaveTextContent(/Pikachu/i);
    expect(Type).toHaveTextContent(/Electric/i);
    expect(Weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(Img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(Img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const infos = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infos);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const infos = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infos);

    const btn = screen.getByRole('checkbox');
    userEvent.click(btn);

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
