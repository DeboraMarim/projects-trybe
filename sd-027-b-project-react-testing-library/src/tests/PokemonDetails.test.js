import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste em kemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const infos = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infos);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(infos).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }));
    expect(screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.')).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon e testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const infos = screen.getByRole('link', { name: 'More details' });
    userEvent.click(infos);

    const img = screen.getAllByRole('img')[1];
    const imgg = screen.getAllByRole('img')[2];

    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 })).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img).toHaveAttribute('alt', 'Pikachu location');
    expect(imgg).toHaveAttribute('alt', 'Pikachu location');

    const check = screen.getByRole('checkbox');
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(check).toHaveProperty('checked', false);
    userEvent.click(check);
    expect(check).toHaveProperty('checked', true);
  });
});
