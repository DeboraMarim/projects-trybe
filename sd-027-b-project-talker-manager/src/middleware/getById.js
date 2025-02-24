const read = require('./read');

const getById = async (id, path) => {
  const talkers = await read(path);
  return talkers.find((talker) => talker.id === Number(id));
};

module.exports = getById;
