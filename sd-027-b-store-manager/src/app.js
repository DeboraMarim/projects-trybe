const express = require('express');
const router = require('./routes/routeProducts');
const routerSales = require('./routes/salesRoute');

const app = express();
app.use(express.json()); 

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', router);
app.use('/sales', routerSales);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;