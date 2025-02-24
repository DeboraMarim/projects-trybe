const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  // Atenção: 'v' é a variavel 'employee' que está no index no find, porem o linter nao aceita mais que
  // 100 caracteres em uma linha, então reduzi o nome da variável para nao precisar mexer na estrutura
  // do cogigo :)
  return data.employees.find((v) => (v.firstName === employeeName || v.lastName === employeeName));
}

module.exports = getEmployeeByName;
