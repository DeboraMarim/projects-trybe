const productsModel = require('../models');

const getAllProducts = async () => {
  const data = await productsModel.getAllProducts();
  return data;
};

const getProductById = async (id) => {
  const data = await productsModel.getProductById(id);
  return data;
};

const createProduct = async (product) => {
  const data = await productsModel.createProduct(product);
  return {
    type: null,
    message: {
      id: data,
      name: product,
    },
  };
};

const updateProductByID = async (id, nameProduct) => {
  const products = await productsModel.getAllProducts();
  const validIds = products.map((product) => product.id);
  const isValidId = validIds.includes(id);
  if (!isValidId) return { type: 404, message: 'Product not found' };
  const validIdName = nameProduct.length > 4;
  if (!validIdName) {
    return {
      type: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  await productsModel.updateProductByID(id, nameProduct);
  return { type: null, message: null };
};

module.exports = { getAllProducts, getProductById, createProduct, updateProductByID };