const userController = require('../users/userController.js');
const helpers = require('./helpers.js'); // our custom middleware
const path = require('path');

module.exports = function (app) {
  app.post('/login', userController.signin);
  app.post('/signup', userController.signup);
  app.post('/add_a_book', userController.addABook);
  app.get('/get_books', userController.getBooks);
  app.delete('/delete_a_book', userController.deleteBook);

  app.get('/', (req, res) => {
    console.log('get for /');
    res.render(path.resolve('Client/views/signup.ejs'));
  });
  app.get('#/signup', (req, res) => {
    console.log('get for #/signup');
    res.render(path.resolve('Client/views/signup.ejs'));
  });

  app.get('#/login', (req, res) => {
    console.log('get for #/login');
    res.render(path.resolve('Client/views/login.ejs'));
  });

  // app.use('#/build_a_book', helpers.decode);

  app.get('#/build_a_book', (req, res) => {
    res.render(path.resolve('Client/views/build_a_book.ejs'));
  });

  // app.use('#/my_books', helpers.decode);

  app.get('#/my_books', (req, res) => {
    res.render(path.resolve('Client/views/my_books.ejs'));
  });

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
