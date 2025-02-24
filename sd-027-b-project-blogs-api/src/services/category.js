const { Category } = require('../models');
const { nameValidationCat } = require('../validations/validations');

// Obter todas as categorias
const getCategory = () => Category.findAll()
  .then((categories) => categories)
  .catch((error) => {
    throw error;
  });

// Criar uma nova categoria
const createCategory = async (name) => {
  const error = nameValidationCat(name);
  if (error.type) return error;

  let category;
  if (name) {
    category = await Category.create({ name });
  } else {
    throw new Error('Category name is required');
  }

  return { type: null, message: category };
};

module.exports = {
  getCategory,
  createCategory,
};
