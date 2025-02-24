const models = require('../models');

const checkSale = (sale) => {
  const errorr = !sale.every((check) => check === null);

  if (errorr) {
    const value = sale.find(
      (check) => check !== null && 'message' in check,
    );
    return { type: 400, ...value };
  }
};

const searchID = (sale) => {
  const success = sale.map((check) => {
    if (!('productId' in check)) {
      return { message: '"productId" is required' };
    }

    if (!('quantity' in check)) {
      return { message: '"quantity" is required' };
    }
    return null;
  });
  return checkSale(success);
};

const searchProduct = async (sale) => {
  const success = await Promise.all(
    sale.map(async (check) => {
      const { productId, quantity } = check;
      const idCheck = await models.getProductById(productId);
      if (!idCheck) return { type: 404, message: 'Product not found' };

      if (Number(quantity) <= 0) {
        return {
          type: 422,
          message: '"quantity" must be greater than or equal to 1',
        };
      }
      return null;
    }),
  );
  return checkSale(success);
};

module.exports = {
  searchID,
  searchProduct,
};