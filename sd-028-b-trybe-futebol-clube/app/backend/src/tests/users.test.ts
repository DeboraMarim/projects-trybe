import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeUsers from '../database/models/SequelizeUsers';
import { allUsers, userById } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /users', function() {
  afterEach(function () {
    sinon.restore();
  })
  
  describe('GET /users', function() {
    it('Testando o retorno de todos os times', async function () {
      sinon.stub(SequelizeUsers, 'findAll').resolves(allUsers as any)
      
      const { status, body } = await chai.request(app).get('/users');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allUsers);
    })
  })

  describe('GET /users/:id', function() {
    it('Testando o retorno ao passar um id correto', async function () {
      sinon.stub(SequelizeUsers, 'findByPk').resolves(userById as any)
      
      const { status, body } = await chai.request(app).get('/users/1');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(userById);
    })

    it('Testando o retorno ao passar um id incorreto', async function () {
      sinon.stub(SequelizeUsers, 'findByPk').resolves(null)
      
      const { status, body } = await chai.request(app).get('/users/777');
    
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'User with this ID does not exist' });
    })
  })
})