const models = require('../models');
const validations = require('../middlewares/salesMiddleware');

const creatSale = async (newSale) => {
  const check1 = validations.searchID(newSale);
  if (check1) return check1;

  const check2 = await validations.searchProduct(newSale);
  if (check2) return check2;

  const result = await models.creatSale(newSale);
  console.log(result);
  return { type: null, message: { id: result, itemsSold: newSale } };
};

const getAllSales = async () => {
  const sales = await models.getAllSales();
  return { type: null, message: sales };
};

const getSalesByID = async (data) => {
  const sales = await models.getSalesByID(data);
  if (sales.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sales };
};

module.exports = { creatSale, getSalesByID, getAllSales };