const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  let resul;
  data.species.filter((specie) => {
    if (specie.name === animal) {
      resul = specie.residents.every((daVez) => daVez.age >= age);
    }
    return resul;
  });
  return resul;
};
module.exports = getAnimalsOlderThan;
