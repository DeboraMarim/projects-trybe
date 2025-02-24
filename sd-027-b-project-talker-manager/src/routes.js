const express = require('express');
const getData = require('./middleware/getData');
const getId = require('./middleware/getId');
const write = require('./middleware/write');
const read = require('./middleware/read');
const generateNewToken = require('./middleware/generateNewToken');
const getQuery = require('./middleware/getQuery');
const checkQueryRate = require('./middleware/checkQueryRate');
const checkQueryDate = require('./middleware/checkQueryDate');
const checkRate = require('./middleware/checkRate');
const { checkEmail, checkPassword } = require('./middleware/checkLogin');
const { tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateCheck,
  rateCheck } = require('./middleware/checkTalk');

const getById = require('./middleware/getById');
const noById = require('./middleware/noById');

const { path } = require('./middleware/setPath');

const router = express.Router();

// endpoint 08 e 09 e 10
router.get('/talker/search',
  tokenCheck,
  checkQueryRate,
  checkQueryDate,
   async (req, res) => {
    const search = await getQuery(path, req.query);

    return res.status(200).json(search);
   });

// endpoint 01
router.get('/talker', async (_req, res) => res.status(200).json(await getData(path)));

// endpoint 02
router.get('/talker/:id', async (req, res) => {
    const talker = await getId(path, req.params.id);
    
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    return res.status(200).json(talker);
  });

// endpoint 03 e 04
router.post('/login', checkEmail, checkPassword, (req, res) => {
    try {
      const token = generateNewToken();
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// endpoint 05  
router.post('/talker', tokenCheck,
nameCheck,
ageCheck,
talkCheck,
dateCheck,
rateCheck, async (req, res) => {
  const talker = await read(path);
  const id = talker.length + 1;
  await write(path, [...talker, { ...req.body, id }]);
  return res.status(201).json({ ...req.body, id });
});

// endpoint 06
router.put('/talker/:id',
  tokenCheck,
  nameCheck,
  ageCheck,
  talkCheck,
  dateCheck,
  rateCheck,
  async (req, res) => {
    const { id } = req.params;
    const talk = await read(path);
    const getByID = await getById(id, path);

    if (!getByID) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const num = parseInt(id, 32);
    talk[id - 1] = { id: num, ...req.body };
    await write(path, [...talk]);
    return res.status(200).json(talk[id - 1]);
  });

// endpoint 07  
router.delete('/talker/:id',
  tokenCheck, async (req, res) => {
  const { id } = req.params;
  const talkerById = await noById(id, path);
  await write(path, talkerById);
  return res.sendStatus(204);
});

// endpoint 10
router.patch('/talker/rate/:id', 
tokenCheck,
checkRate, async (req, res) => {
    const talkers = await read(path);
    const id = Number(req.params.id);
    const rate = Number(req.body.rate);
    const idTalker = talkers.findIndex((elem) => elem.id === id);
    talkers[idTalker].talk.rate = rate;
    await write(path, talkers);
    return res.sendStatus(204);
});

module.exports = router;