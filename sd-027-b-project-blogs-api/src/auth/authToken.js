const jwtoken = require('jsonwebtoken');

const { JWT_SECRET: secret } = process.env;
const { JsonWebTokenError: JWTokenError } = require('jsonwebtoken');
const { BlogPost: BP } = require('../models');

// Função para verificar a validade de um token JWT
const verifyToken = (auth) => {
  let payload;
  let error = null;
  try {
    payload = jwtoken.verify(auth, secret);
  } catch (err) {
    error = err;
  }

  if (error) {
    throw error;
  }

  return payload;
};

// Formato do token JWT
const jwtFormat = {
  algorithm: 'HS256',
  expiresIn: '24h',
};

// Função para gerar um token JWT
const generateToken = (payload) => jwtoken.sign({ data: payload }, secret, jwtFormat);

// Middleware para autenticação do usuário
const userAuth = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.payload.data.id;
  let authorization;
  try {
    authorization = await BP.findByPk(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal error' });
  }

  if (!authorization) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (authorization.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return next();
};

// Middleware para validar o token JWT enviado nas requisições
const validateJWToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  let payload;
  let error = null;
  try {
    payload = verifyToken(token);
  } catch (err) {
    error = err;
  }
  if (error) {
    if (error instanceof JWTokenError) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    console.log(error);
    return res.status(500).json({ message: 'Internal error' });
  }
  req.payload = payload;
  return next();
};

module.exports = {
  generateToken,
  verifyToken,
  validateJWToken,
  userAuth,
};
