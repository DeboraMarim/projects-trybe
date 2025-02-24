const data = require('../data/zoo_data');

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}
const getRelatedEmployees = (managerId) => {
  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  return data.employees.filter((daVez) => daVez.managers.includes(managerId))
    .map((element) => `${element.firstName} ${element.lastName}`);
};

module.exports = { isManager, getRelatedEmployees };
