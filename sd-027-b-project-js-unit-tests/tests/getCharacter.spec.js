const getCharacter = require('../src/getCharacter');
describe('9 - Implemente os casos de teste da função `getCharacter`', () => {
  it('Verifica se a função `getCharacter` retorna o objeto do personagem corretamente.', () => {
    expect(getCharacter()).toBeUndefined;
    expect(getCharacter('arya')).toEqual({name: 'Arya Stark', class: 'Rogue', phrases: ['Not today', 'A girl has no name.']});
    expect(getCharacter('brienne')).toEqual({name: 'Brienne Tarth',class: 'Knight', phrases: ['Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.']})
    expect(getCharacter('melissandre')).toEqual({name: 'Melissandre',class: 'Necromancer', phrases: ['Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.']});
    expect(getCharacter('Melissandre')).toMatchObject({name: 'Melissandre', class: 'Necromancer', phrases: [ 'Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.' ]});
    expect(getCharacter('Helma')).toBeUndefined;
  });
});
