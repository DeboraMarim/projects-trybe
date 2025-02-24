const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductByID,
} = require('./productsController');

const {
  creatSale,
  getSalesByID,
  getAllSales,
} = require('./salesController');

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  creatSale,
  getSalesByID,
  getAllSales,
  updateProductByID,
};
