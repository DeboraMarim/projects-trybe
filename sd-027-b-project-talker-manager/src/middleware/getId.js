const fs = require('fs').promises;

const getById = async (filePath, id) => {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    const selectedData = parsedData.find((elem) => elem.id === Number(id));

    if (!selectedData) {
      const error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    }

    return selectedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getById;
