const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => {
  const returnSpecies = [];
  ids.forEach((id) => {
    data.species.forEach((epecie, index) => {
      if (epecie.id === id) {
        returnSpecies.push(data.species[index]);
      }
    });
  });
  return returnSpecies;
};

module.exports = getSpeciesByIds;
