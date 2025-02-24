const read = require('./read');

const notById = async (id, path) => {
  const talkers = await read(path);
  return talkers.filter((one) => one.id !== Number(id));
};

module.exports = notById;
