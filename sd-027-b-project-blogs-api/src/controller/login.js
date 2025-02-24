const { generateToken } = require('../auth/authToken');
const userService = require('../services/users');

// Função de login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se os campos obrigatórios estão presentes
  if (!(email && password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  // Obter os dados do usuário com base no email
  const data = await userService.getByEmail(email);

  // Verificar se os dados do usuário são válidos
  if (!data) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  // Gerar token de autenticação
  const token = generateToken(data);

  // Retornar o token na resposta
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
