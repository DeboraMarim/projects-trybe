import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeUsers from '../database/models/SequelizeUsers';
import { invalidEmail, invalidLogin, invalidLoginNoEmail, invalidLoginNoPassword, invalidToken, validLogin, validRole, validToken, validUser, wrongPassword } from './mocks/login.mock';
import JWTutlis from '../utils/JWTutils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', function() {  
  afterEach(function () {
    sinon.restore();
  })
  describe('POST /login', function() {

    it('Testando o retorno ao colocar um usuário valido', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(validUser as any)
      sinon.stub(JWTutlis, 'sign').resolves('new_Token')
      
      const { status, body } = await chai.request(app).post('/login').send(validLogin);
    
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('token');
    })
    it('Testando o retorno ao colocar um usuário invalido', async function () {
      sinon.stub(SequelizeUsers, 'findOne').resolves(null)
      
      const { status, body } = await chai.request(app).post('/login').send(invalidLogin);
    
      expect(status).to.equal(401);
      expect(body).to.haveOwnProperty('message', 'Invalid email or password');
    })
  
    it('Testando o retorno ao colocar um usuário sem email', async function () {
      
      const { status, body } = await chai.request(app).post('/login').send(invalidLoginNoEmail);
    
      expect(status).to.equal(400);
      expect(body).to.haveOwnProperty('message', 'All fields must be filled');
    })
  
    it('Testando o retorno ao colocar um usuário sem senha', async function () {
      
      const { status, body } = await chai.request(app).post('/login').send(invalidLoginNoPassword);
    
      expect(status).to.equal(400);
      expect(body).to.haveOwnProperty('message', 'All fields must be filled');
    })
  
    it('Testando o retorno ao colocar um usuário com senha incorreta', async function () {
      
      const { status, body } = await chai.request(app).post('/login').send(wrongPassword);
    
      expect(status).to.equal(401);
      expect(body).to.haveOwnProperty('message', 'Invalid email or password');
    })
  
    it('Testando o retorno ao colocar um usuário com email incorreto', async function () {
      
      const { status, body } = await chai.request(app).post('/login').send(invalidEmail);
    
      expect(status).to.equal(401);
      expect(body).to.haveOwnProperty('message', 'Invalid email or password');
    })
  })

  describe('GET /login/role', function() {

    it('Testando o retorno ao ter um login válido', async function () {
      sinon.stub(JWTutlis, 'verify').returns(validRole)

      const { status, body } = await chai.request(app).get('/login/role').set('Authorization',validToken)
    
      expect(status).to.equal(200);
      expect(body).to.be.have.property('role', 'admin');
    })

    it('Testando o retorno ao ter um token inválido', async function () {

      const { status, body } = await chai.request(app).get('/login/role').set('Authorization',invalidToken)
    
      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Token must be a valid token');
    })

    it('Testando o retorno ao ter não ter token', async function () {

      const { status, body } = await chai.request(app).get('/login/role').set('Authorization','')
    
      expect(status).to.equal(401);
      expect(body).to.be.have.property('message', 'Token not found');
    })
  })
  })