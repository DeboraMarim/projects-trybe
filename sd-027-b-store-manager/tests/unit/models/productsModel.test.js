const db = require('../../../src/models/connection');
const productsModel = require('../../../src/models');
const { expect } = require('chai')

describe('Model Tests', () => {
  // Teste para verificar se a função getAllProducts retorna um array
  it('getAllProducts should return an array', async () => {
    const result = await productsModel.getAllProducts();
    expect(Array.isArray(result)).to.be.equal(true);
  });

  // Teste para verificar se a função getProductById retorna um objeto
  it('getProductById should return an object', async () => {
    const result = await productsModel.getProductById(1);
    expect(typeof result).to.be.equal('object');
  });

  // Teste para verificar se a função getProductById retorna um objeto com as informações corretas
  it('getProductById should return an object with correct information', async () => {
    const result = await productsModel.getProductById(1);
    expect(result.id).to.be.equal(1);
    expect(result.name).to.be.equal(`Martelo de Thor`);
    // adicione outras expectativas aqui para garantir que todas as informações estejam corretas
  });
});