const Joi = require('joi');

// Esquema de validação para os campos de login
const loginSchemaFields = Joi.object({
  displayName: Joi.string().min(8).required(), // Campo displayName deve ser uma string com pelo menos 8 caracteres
  email: Joi.string().email().required(), // Campo email deve ser uma string no formato de email válido
  password: Joi.string().min(6).required(), // Campo password deve ser uma string com pelo menos 6 caracteres
  image: Joi.string(), // Campo image é opcional e deve ser uma string
});

// Esquema de validação para um nome
const nameSchema = Joi.object({
  name: Joi.string().min(1).required(), // Campo name deve ser uma string com pelo menos 1 caracter
});

// Esquema de validação para os campos de postagem
const postSchemaFields = Joi.object({
  title: Joi.string().min(1).required(), // Campo title deve ser uma string com pelo menos 1 caracter
  content: Joi.string().min(1).required(), // Campo content deve ser uma string com pelo menos 1 caracter
}).unknown(); // Permite campos adicionais não especificados no esquema

const invalidFields = 'INVALID_FIELDS';

// Função para validar os campos de usuário
const validateUser = (userFields) => {
  const { error } = loginSchemaFields.validate(userFields);

  if (error) {
    return { type: invalidFields, message: error.message };
  }
  return { type: null, message: '' };
};

// Função para validar um nome de categoria
const nameValidationCat = (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) {
    return { type: invalidFields, message: error.message };
  }
  return { type: null, message: '' };
};

// Função para validar os campos de uma postagem
const validatePost = (postFields, categories) => {
  const { error } = postSchemaFields.validate(postFields);

  if (error) {
    return { type: invalidFields, message: 'Some required fields are missing' };
  }

  const allIdsFound = postFields.categoryIds
    .every((categoryId) => categories.some((category) => category.id === categoryId));

  if (!allIdsFound) {
    return { type: invalidFields, message: 'one or more "categoryIds" not found' };
  }
  return { type: null, message: '' };
};

// Função para validar os campos de uma atualização de postagem
const postUpdate = (updateBody) => {
  const { error } = postSchemaFields.validate(updateBody);

  if (error) {
    return { type: invalidFields, message: 'Some required fields are missing' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateUser,
  nameValidationCat,
  validatePost,
  postUpdate,
};
