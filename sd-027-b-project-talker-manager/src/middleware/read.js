const fs = require('fs').promises;

const read = async (path) => {
  try {
    const jsonContent = await fs.readFile(path);
    return JSON.parse(jsonContent);
  } catch (err) {
    console.error(err.message);
  
    throw new Error(err.message);
  }
};

module.exports = read;
