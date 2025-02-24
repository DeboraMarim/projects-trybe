// Objeto errorMap que mapeia tipos de erro a códigos HTTP
const errorMap = {
  INVALID_FIELDS: 400, // Erro de campos inválidos, código HTTP 400 Bad Request
  DUPLICATE_USER: 409, // Erro de usuário duplicado, código HTTP 409 Conflict
  UNAUTHORIZED: 401, // Erro de autenticação não autorizada, código HTTP 401 Unauthorized
};

// Função mapError que retorna o código HTTP correspondente a um tipo de erro
const mapError = (type) => errorMap[type] || 500; // Retorna o código HTTP mapeado ou 500 Internal Server Error caso não haja mapeamento

// Exporta o objeto errorMap e a função mapError para serem utilizados em outros módulos
module.exports = {
  errorMap,
  mapError,
};
