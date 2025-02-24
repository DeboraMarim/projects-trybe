import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testes em Pokedex.js', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByText(/Encountered Pokémon/i);
    expect(h2).toBeInTheDocument();
  });
});
describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(btn).toBeInTheDocument();
  });
  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: /Próximo Pokémon/i });

    pokemonList.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(btn);
    });
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo Pokémon/i });
    // ps: variavel i iniciada em 1 para facilitar o codigo seguinte:
    const first = pokemonList[1].name;
    for (let i = 1; i <= pokemonList.length; i += 1) {
      if (i === pokemonList.length) {
        // const btn = screen.getByRole('button', { name: /Próximo Pokémon/i });
        userEvent.click(btn);
        expect(screen.getByText(first)).toBeInTheDocument();
      }
    }
  });
  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filter = screen.getAllByTestId('pokemon-type-button');
    const btn = screen.getByRole('button', { name: 'All' });
    expect(filter).toHaveLength(7);
    expect(btn).toBeInTheDocument();

    const btn2 = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(btn2);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(nextPokemonBtn);
    const rapidash = screen.getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btn = screen.getByRole('button', { name: 'All' });
    expect(btn).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(btn);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
