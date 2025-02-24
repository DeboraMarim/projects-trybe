const data = require('../data/zoo_data');

const { species, hours } = data;

function getAnimals(dia) {
  return species.filter((daVez) =>
    daVez.availability.includes(dia)).map((nameDavez) => nameDavez.name);
}

const getHours = () =>
  Object.assign(
    {},
    ...Object.keys(hours).map((dayDaVez) => {
      const { open, close } = hours[dayDaVez];
      return {
        [dayDaVez]: {
          officeHour: dayDaVez !== 'Monday' ? `Open from ${open}am until ${close}pm` : 'CLOSED',
          exhibition: dayDaVez !== 'Monday' ? getAnimals(dayDaVez) : 'The zoo will be closed!',
        },
      };
    }),
  );

function getSchedule(scheduleTarget) {
  const hourX = getHours();
  const animalX = species.some((daVez) => Object.values(daVez).includes(scheduleTarget));
  const daysWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (!scheduleTarget) {
    return hourX;
  }
  if (animalX) {
    return species.find((daVez) => daVez.name === scheduleTarget).availability;
  }
  if (daysWeek.includes(scheduleTarget)) {
    return {
      [scheduleTarget]: hourX[scheduleTarget],
    };
  }
  if (!animalX) {
    return hourX;
  }
}
console.log(getSchedule('lions'));
module.exports = getSchedule;
