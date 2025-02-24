const express = require('express');

const { validateJWToken } = require('./auth/authToken');
const userController = require('./controller/user');
const categoryController = require('./controller/category');
const blogPostController = require('./controller/blogPost');
const { userAuth } = require('./auth/authToken');

 const user = require('./controller/login');

const app = express();

app.get('/', (_request, response) => {
    response.send();
  });

  app.use(express.json());

 app.post('/login/', user.login);

app.get('/user', validateJWToken, userController.getAllUsers);
app.get('/user/:id', validateJWToken, userController.getUserById);
app.post('/user', userController.createUser);
app.delete('/user/:me', validateJWToken, userController.deleteUserByID);

app.get('/categories', validateJWToken, categoryController.getCategory);
app.post('/categories', validateJWToken, categoryController.createCategory);

app.get('/post', validateJWToken, blogPostController.getAllBlogs);
app.get('/post/search', validateJWToken, blogPostController.searchPost);
app.get('/post/:id', validateJWToken, blogPostController.getPostById);
app.post('/post', validateJWToken, blogPostController.createPost);
app.put('/post/:id', validateJWToken, userAuth, blogPostController.updatePost);
app.delete('/post/:id', validateJWToken, userAuth, blogPostController.deletePost);

module.exports = app;
