const productsServices = require('../../../src/services/productsService');
const { mock } = require('../mock');
const { expect } = require('chai')

describe('Services Tests', () => {
  // Teste para verificar se a função getAllProducts retorna um array
  it('getAllProducts should return an array', async () => {
    // substitui a função original pela lista mock
    productsServices.getAllProducts = () => mock;

    const result = await productsServices.getAllProducts();
    expect(Array.isArray(result)).to.be.equal(true);
  });
  it('getAllProducts should return an array', async () => {
    // substitui a função original pela lista mock
    productsServices.getAllProducts = () => mock;

    const result = await productsServices.getAllProducts();
    expect(Array.isArray(result)).to.be.equal(true);
  });

  // Teste para verificar se a função getProductById retorna um objeto
  it('getProductById should return an object', async () => {
    // substitui a função original pelo mock
    productsServices.getProductById = (id) => mock.find(product => product.id === id);

    const result = await productsServices.getProductById(1);
    expect(typeof result).to.be.equal('object');
  });

  // Teste para verificar se a função getProductById retorna um erro quando o id é inválido

});
