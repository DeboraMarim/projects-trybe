const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const returnEntrants = { child: 0, adult: 0, senior: 0 };
  entrants.forEach((daVez) => {
    if (daVez.age < 18) {
      returnEntrants.child += 1;
    }
    if (daVez.age >= 18 && daVez.age < 50) {
      returnEntrants.adult += 1;
    }
    if (daVez.age >= 50) {
      returnEntrants.senior += 1;
    }
  });
  return returnEntrants;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }
  const novo = countEntrants(entrants);
  const priceChild = novo.child * 20.99;
  const priceAdult = novo.adult * 49.99;
  const priceSenior = novo.senior * 24.99;
  const sum = priceChild + priceAdult + priceSenior;
  return (countEntrants(entrants) && sum);
}

module.exports = { calculateEntry, countEntrants };
