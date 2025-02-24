const categoryService = require('../services/category');
const errorMap = require('../utils/errorMap');

// Obter categorias
const getCategory = async (_req, res) => {
  const data = await categoryService.getCategory();

  return res.status(200).json(data);
};

// Criar uma nova categoria
const createCategory = async (req, res) => {
  const { type, message } = await categoryService.createCategory(req.body.name);

  // Verificar se ocorreu algum erro na criação da categoria
  if (type) {
    const log = errorMap.mapError(type);

    return res.status(log).json({ message });
  }

  // Retornar a categoria criada com sucesso
  return res.status(201).json(message);
};

module.exports = {
  getCategory,
  createCategory,
};
