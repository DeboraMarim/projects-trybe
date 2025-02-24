const salesServices = require('../services');

const creatSale = async (req, res) => {
  const data = req.body;

  const { type, message } = await salesServices.creatSale(data);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const getAllSales = async (req, res) => {
  const { type, message } = await salesServices.getAllSales();
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const getSalesByID = async (req, res) => {
  const { id } = req.params; // check
  const { type, message } = await salesServices.getSalesByID(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = { creatSale, getSalesByID, getAllSales };