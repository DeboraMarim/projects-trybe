const selectQuery = require('./selectQuery');
const read = require('./read');

const getQuery = async (path, query) => {
  try {
    const talkers = await read(path);
    const file = Object.entries(query);
    let talker = [...talkers];
    
    for (let i = 0; i < file.length; i += 1) {
      const [key, value] = file[i];
      talker = selectQuery(talker, key, value);
    }
    
    return talker;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getQuery;
