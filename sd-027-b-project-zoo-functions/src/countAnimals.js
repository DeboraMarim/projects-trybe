const data = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    const numberOfAnimals = {};
    data.species.forEach((daVez) => {
      numberOfAnimals[daVez.name] = daVez.residents.length;
    });
    return numberOfAnimals;
  }
  if (!animal.sex) {
    return data.species.find((daVez) => daVez.name === animal.specie).residents.length;
  } return data.species.find((daVez) => daVez.name === animal.specie)
    .residents.filter((novo) => novo.sex === animal.sex).length;
};
module.exports = countAnimals;
