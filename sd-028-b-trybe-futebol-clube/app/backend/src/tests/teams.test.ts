import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import SequelizeTeams from '../database/models/SequelizeTeams';
import { allTeams, teamById } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', function() {
  afterEach(function () {
    sinon.restore();
  })
  
  describe('GET /Teams', function() {
    it('Testando o retorno de todos os times', async function () {
      sinon.stub(SequelizeTeams, 'findAll').resolves(allTeams as any)
      
      const { status, body } = await chai.request(app).get('/teams');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allTeams);
    })
  })

  describe('GET /Teams/:id', function() {
    it('Testando o retorno ao passar um id correto', async function () {
      sinon.stub(SequelizeTeams, 'findByPk').resolves(teamById as any)
      
      const { status, body } = await chai.request(app).get('/teams/7');
    
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamById);
    })

    it('Testando o retorno ao passar um id incorreto', async function () {
      sinon.stub(SequelizeTeams, 'findByPk').resolves(null)
      
      const { status, body } = await chai.request(app).get('/teams/777');
    
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Team with this ID does not exist' });
    })
  })
})