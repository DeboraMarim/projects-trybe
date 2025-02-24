const productsController = require('../../../src/controllers/productsController');
const productsServices = require('../../../src/services/productsService');
const { mock } = require('../mock');
const { expect } = require('chai');

describe('Controller Tests', () => {
  // Teste para verificar se a função getAllProducts retorna um array
  it('getAllProducts should return an array', async () => {
    // substitui a função original pela lista mock
    productsServices.getAllProducts = () => mock;

    const req = {};
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.be.equal(200);
        return this;
      },
      json: function (data) {
        expect(Array.isArray(data)).to.be.equal(true);
        expect(data.length).to.be.equal(mock.length);
      }
    };

    await productsController.getAllProducts(req, res);
  });

  // Teste para verificar se a função getProductById retorna um objeto
  it('getProductById should return an object', async () => {
    // substitui a função original pelo mock
    productsServices.getProductById = (id) => mock.find(product => product.id === id);

    const req = {
      params: {
        id: 1
      }
    };
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.be.equal(200);
        return this;
      },
      json: function (data) {
        expect(typeof data).to.be.equal('object');
        expect(data.id).to.be.equal(1);
        expect(data.name).to.be.equal(mock[0].name);
      }
    };

    await productsController.getProductById(req, res);
  });

  // Teste para verificar se a função getProductById retorna erro quando o id é inválido
  it('getProductById should return an error when id is invalid', async () => {
    // substitui a função original pelo mock
    productsServices.getProductById = () => null;

    const req = {
      params: {
        id: 9999
      }
    };
    const res = {
      status: function (statusCode) {
        expect(statusCode).to.be.equal(404);
        return this;
      },
      json: function (data) {
        expect(data.message).to.be.equal('Product not found');
      }
    };

    await productsController.getProductById(req, res);
  });
});
