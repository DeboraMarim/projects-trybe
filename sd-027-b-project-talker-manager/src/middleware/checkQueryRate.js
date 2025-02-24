const checkQuery = async (req, res, next) => {
  const { rate } = req.query;
  const rateNumber = Number(rate);
  const isValid = () => Number.isInteger(rateNumber) && rateNumber >= 1 && rateNumber <= 5;
  if (rate && !isValid()) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = checkQuery;