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
  res.render(`${__dirname}/Client/views/signup.ejs`);
});

app.get('/signup', (req, res) => {
  res.render(`${__dirname}/Client/views/signup.ejs`);
});

app.get('/login', (req, res) => {
  res.render(`${__dirname}/Client/views/login.ejs`);
});

app.get('/build_a_book', (req, res) => {
  res.render(`${__dirname}/Client/views/build_a_book.ejs`);
});

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.get('/my_books', (req, res) => {
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
      console.log(res.body);
      res.redirect('/');
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
        res.render(`${__dirname}/Client/views/login.ejs`);
      }
    });
  }
});
