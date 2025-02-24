const blogPostService = require('../services/blogPost');
const errorMap = require('../utils/errorMap');

// Função auxiliar para verificar se um post existe
const checkExist = (conditional, res) => {
  if (conditional) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

// Obter todos os posts
const getAllBlogs = async (_req, res) => {
  const data = await blogPostService.getAllBlogs();
  return res.status(200).json(data);
};

// Obter um post pelo ID
const getPostById = async (req, res) => {
  const { id } = req.params;
  const data = await blogPostService.getPostById(id);
  if (!data) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(data);
};

// Pesquisar posts
const searchPost = async (req, res) => {
  const { q } = req.query;
  const data = await blogPostService.searchPost(q);
  return res.status(200).json(data);
};

// Criar um novo post
const createPost = async (req, res) => {
  const { id } = req.payload.data;
  const { type, message } = await blogPostService.createPost(id, req.body);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(201).json(message);
};

// Atualizar um post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { type, message } = await blogPostService.updatePost(id, body);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  return res.status(200).json(message);
};

// Excluir um post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostService.deletePost(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  checkExist(+message === 0, res);
  return res.status(204).end();
};

module.exports = {
  getAllBlogs,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
