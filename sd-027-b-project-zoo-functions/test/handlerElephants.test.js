const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('Testes da função HandlerElephants', () => {
    expect(handlerElephants()).toBeUndefined();
    expect(handlerElephants('')).toBeNull();
    expect(handlerElephants('count')).toBe(4);
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
    expect(handlerElephants('name')).toBe('elephants');
    expect(handlerElephants('location')).toEqual('NW');
    expect(handlerElephants('averageAge')).toBe(10.5);
    expect(handlerElephants(!String)).toEqual('Parâmetro inválido, é necessário uma string');
  });
});
