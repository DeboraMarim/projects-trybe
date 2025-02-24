const read = require('./read');

const getData = async (file) => {
  const data = await read(file);
  return data;
};

module.exports = getData;