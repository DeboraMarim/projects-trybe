const { generateToken } = require('../auth/authToken');
const userService = require('../services/users');
const errorMap = require('../utils/errorMap');

// Obter todos os usuários
const getAllUsers = async (_req, res) => {
  const data = await userService.getAllUsers();
  return res.status(200).json(data);
};

// Obter um usuário por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  const data = await userService.getUserById(id);
  if (!data) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(data);
};

// Criar um novo usuário
const createUser = async (req, res) => {
  const { body } = req;
  const { type, message } = await userService.createUser(body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  const { password: _password, ...userWithoutPassword } = message.dataValues;
  const tokenCheck = generateToken(userWithoutPassword);
  return res.status(201).json({ token: tokenCheck });
};

// Deletar um usuário por ID
const deleteUserByID = async (req, res) => {
  const { id } = req.payload.data;
  const { type, message } = await userService.deleteUserByID(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(204).end();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserByID,
};
