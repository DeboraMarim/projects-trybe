const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductByID,
} = require('./productsModel');

const {
  creatSale,
  getSalesByID,
  getAllSales,
} = require('./salesModel');

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  creatSale,
  getSalesByID,
  getAllSales,
  updateProductByID,
}; 