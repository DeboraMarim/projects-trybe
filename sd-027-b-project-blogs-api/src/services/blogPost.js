const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');
const { validatePost, postUpdate } = require('../validations/validations');

// Obter todos os posts do blog
const getAllBlogs = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
  attributes: { exclude: ['user_id'] },
});

// Obter um post do blog por ID
const getPostById = (id) => BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
  attributes: { exclude: ['user_id'] },
});

// Pesquisar posts do blog por título ou conteúdo
const searchPost = (searchBody) => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories' },
  ],
  attributes: { exclude: ['user_id'] },
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${searchBody}%` } },
      { content: { [Op.like]: `%${searchBody}%` } },
    ],
  },
});

// Criar um novo post no blog
const createPost = async (userId, newPostBody) => {
  const categories = await Category.findAll();
  const validationError = validatePost(newPostBody, categories);
  if (validationError.type) return validationError;
  const transaction = await sequelize.transaction();
  try {
    const { dataValues } = await BlogPost.create({ ...newPostBody, userId }, { transaction });
    await Promise.all(
      newPostBody.categoryIds.map((id) =>
        PostCategory.create({ postId: dataValues.id, categoryId: id }, { transaction })),
    );
    await transaction.commit();
    return { type: null, message: dataValues };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Atualizar um post do blog
const updatePost = async (id, mud) => {
  const validationError = postUpdate(mud);
  if (validationError.type) return validationError;
  await BlogPost.update(mud, { where: { id } });
  const updatedPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
    attributes: { exclude: ['user_id'] },
  });
  return { type: null, message: updatedPost };
};

// Deletar um post do blog
const deletePost = async (id) => {
  const deleteOk = await BlogPost.destroy({ where: { id } });
  return { type: null, message: deleteOk };
};

module.exports = {
  getAllBlogs,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPost,
};
