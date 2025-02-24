const data = require('../data/zoo_data');

const { species, employees } = data;

function getOldestFromFirstSpecies(id) {
  const peopleX = employees.find((daVez) => daVez.id === id);
  const animalX = peopleX.responsibleFor[0];
  const animalsX = species.find((specie) => specie.id === animalX).residents;
  const ageX = animalsX.sort((a, b) => a.age - b.age);
  return Object.values(ageX[ageX.length - 1]);
}

module.exports = getOldestFromFirstSpecies;
