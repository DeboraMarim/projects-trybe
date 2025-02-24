const { User } = require('../models');
const { validateUser } = require('../validations/validations');

// Função para obter um usuário pelo email
async function getUserByEmail(email) {
  try {
    return await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  } catch (error) {
    return null;
  }
}

// Função para criar um usuário
async function setUser(userBody) {
  try {
    return await User.create(userBody);
  } catch (error) {
    return null;
  }
}

// Obter todos os usuários
const getAllUsers = () => User.findAll({
  attributes: { exclude: ['password'] },
});

// Obter usuário pelo email
const getByEmail = async (email) => {
  const userEmail = await getUserByEmail(email);
  return userEmail;
};

// Obter usuário pelo ID
const getUserById = (id) => User.findByPk(id, {
  attributes: { exclude: ['password'] },
});

// Criar um novo usuário
const createUser = async (newUserbody) => {
  const error = validateUser(newUserbody);
  const existingUser = await getUserByEmail(newUserbody.email);

  if (existingUser) {
    return { type: 'DUPLICATE_USER', message: 'User already registered' };
  }
  if (error.type) return error;

  const user = await setUser(newUserbody);
  return { type: null, message: user };
};

// Deletar usuário pelo ID
const deleteUserByID = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });
  return { type: null, message: deletedUser };
};

module.exports = {
  getAllUsers,
  getByEmail,
  getUserById,
  createUser,
  deleteUserByID,
};
