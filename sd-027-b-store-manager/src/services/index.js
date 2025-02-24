const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductByID,
} = require('./productsService');

const {
  creatSale,
  getSalesByID,
  getAllSales,
} = require('./salesService');

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  creatSale,
  getSalesByID,
  getAllSales,
  updateProductByID,
};