import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeMatches from '../database/models/SequelizeMatches';
import { allMatches } from './mocks/matches.mock';
import { validRole, validToken } from './mocks/login.mock';
import JWTutlis from '../utils/JWTutils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', function() {
  afterEach(function () {
    sinon.restore();
  })
  
  describe('GET /matches', function() {
    it('Testando o retorno de todos as partidas', async function () {
      sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any)
      
      const { status, body } = await chai.request(app).get('/matches');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatches);
    })

    it('Testando ao requisitar as partidas em andamento', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any)
      const filteredMatches = allMatches.filter((match) => match.inProgress === true)

      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(filteredMatches);
    })

    it('Testando ao requisitar as partidas finalizadas', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any)
      const filteredMatches = allMatches.filter((match) => match.inProgress === false)

      const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(filteredMatches);
    })
  })

  describe('PATCH /matches', function() {
    it('Testando ao tentar encerrar uma partida', async function () {
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      sinon.stub(JWTutlis, 'verify').returns(validRole)     
      const { status, body } = await chai.request(app).patch('/matches/42/finish').set('Authorization', validToken);
    
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal({ "message": "Finished" });
    })

    it('Testando ao tentar encerrar uma partida que já terminou', async function () {
      sinon.stub(SequelizeMatches, 'update').resolves([0]);
      sinon.stub(JWTutlis, 'verify').returns(validRole)     
      const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', validToken);
    
      expect(status).to.equal(400);
      expect(body).to.be.deep.equal({ "message": "This match already finished" });
    })

    it('Testando ao atualizar um placar', async function () {
      sinon.stub(SequelizeMatches, 'update').resolves([1]);
      sinon.stub(JWTutlis, 'verify').returns(validRole)     
      const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', validToken);
    
      expect(status).to.equal(200);
      expect(body).to.be.deep.equal({ "message": "Score Updated" });
    })
  })

})