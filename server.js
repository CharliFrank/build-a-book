/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const User = require('./server/users/userModel.js');
const port = process.env.PORT || 3000;
const user = process.env.USERNAME;
const pword = process.env.PASSWORD;

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };
const app = express();
let db;
const conn = mongoose.connection;


mongoose.connect('mongodb://' + user + ':' + pword + '@ds161950.mlab.com:61950/build-a-book-db', options);

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', (err, database) => {
  if (err) {
    console.error(err, 'Error');
  } else {
    db = database;
    app.listen(port, () => {
      console.warn('Server is listening on port: ', port);
    });
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



app.set('view engine', 'ejs');

app.use(express.static('Client'));

app.get('/', (req, res) => {
  // res.redirect('#/login');
  res.render(`${__dirname}/Client/views/signup.ejs`);
  
});

app.get('#/signup', (req, res) => {
  res.render(`${__dirname}/Client/views/signup.ejs`);
});

app.get('#/login', (req, res) => {
  res.render(`${__dirname}/Client/views/login.ejs`);
});

app.get('#/build_a_book', (req, res) => {
  res.render(`${__dirname}/Client/views/build_a_book.ejs`);
});

// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.get('#/my_books', (req, res) => {
  res.render(`${__dirname}/Client/views/my_books.ejs`);
});

app.post('/signup', (req, res) => {
  console.log('posting for my_books');
  const username = req.body.username;
  const password = req.body.password;

  const person = User({ username, password });
  person.save((err) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      console.log('saved to database');
      res.redirect('/#/build_a_book');
    }
  });
});

app.post('/login', (req, res) => {
  console.log('posting for login');
  const username = req.body.username;
  const password = req.body.password;

  if (username !== undefined && password !== undefined) {
    User.find({ username }, 'username password', (err, person) => {
      if (err) {
        console.error(err, 'Error');
      } else if (username === person[0].username && password === person[0].password) {
        res.redirect('/#/build_a_book');
      } else {
        res.redirect('/#/login');
      }
    });
  }
});

app.post('/add_a_page', (req, res) => {
  console.log('inside /add_a_page post');
  const username = req.body.username;
  const book = req.body.book;

  User.update({ username }, { $push: { books: book } }, (err, data) => {
    if (err) {
      console.error(err, 'Error');
    } else {
      res.redirect('/#/build_a_book');
    }
  });
});

app.get('/get_books', (req, res) => {
  console.log('get to /get_books');
  console.log(req.query);
  const username = req.query.username;

  User.find({ username }, 'username password books', (err, person) => {
    if (err) {
      console.error(err, 'ERROR')
    } else {
      console.log(person[0].books);
      res.send(JSON.stringify(person[0].books));
    }
  });
});

app.delete('/delete_a_book', (req, res) => {
  console.log('hitting delete');
  console.log(req.query);
  const username = req.query.username;
  let newBooks = [];
  
  User.find({ username }, 'username password books', (err, person) => {
    if (err) {
      console.error(err, 'ERROR')
    } else {
      console.log(person[0]);
      // res.send(JSON.stringify(person[0].books));
      person[0].books.forEach( book => {
        console.log(book);
        if (book[0] !== req.query.book) {
          newBooks.push(book);
        }
      }, this);
      console.log(newBooks, 'newbooks');
      User.update({ username }, { books: newBooks }, (err, data) => {
        if (err) {
          console.error(err, 'Error');
        } else {
          console.log(data, 'data');
          res.redirect('/#/my_books');
        }
      });
    }
  });
});
