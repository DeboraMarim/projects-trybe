const productsServices = require('../services');

const getAllProducts = async (req, res) => {
  const data = await productsServices.getAllProducts();
  if (!data) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const data = await productsServices.getProductById(id);
  if (!data) {
    return res.status(404).json({ message: 'Product not found' });
  }
    return res.status(200).json(data);
};

const createProduct = async (req, res) => {
  const product = req.body.name;
  if (!product) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (product.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const { message } = await productsServices.createProduct(product);
  return res.status(201).json(message);
};

const updateProductByID = async (req, res) => {
  const nameProduct = req.body.name;
  const id = Number(req.params.id);
  const { type, message } = await productsServices.updateProductByID(id, nameProduct);

  if (type) return res.status(type).json({ message });
  return res.status(200).json({ id, name: nameProduct });
};

// socorro Deus

module.exports = { getAllProducts, getProductById, createProduct, updateProductByID };
