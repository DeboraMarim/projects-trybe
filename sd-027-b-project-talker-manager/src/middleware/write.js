const fs = require('fs').promises;

const write = async (path, data) => {
  try {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('Successfully');
    });
    return data;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
};

module.exports = write;