const productDetails = require('../src/productDetails');
describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    expect(typeof productDetails).toBe('function');
    expect(typeof productDetails('Alcool gel', 'Máscara')).toBe('object');
    expect(productDetails('Alcool gel', 'Máscara').length).toBe(2);
    expect(typeof Object.values(productDetails('Alcool gel', 'Máscara'))).toBe('object');
    expect(productDetails('alcool gel', 'Máscara')[0]).not.toEqual(productDetails('alcool gel', 'Máscara')[1]);
    expect(productDetails('Alcool gel', 'Máscara').every((objeto) => objeto.details.productId.endsWith('123'))).toBe(true);
  });
});
