/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const user = process.env.USERNAME;
const password = process.env.PASSWORD;

const app = express();
let db;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

MongoClient.connect('mongodb://' + user + ':' + password + '@ds161950.mlab.com:61950/build-a-book-db', (err, database) => {
  if (err) {
    console.error(err, 'Error', user, password);
  } else {
    db = database;
    app.listen(port, () => {
      console.warn('Server is listening on port: ', port);
    });
  }
});

app.get('/', (req, res) => {
  console.log('Cash me outside! My get to / is working!');
  res.render(`${__dirname}/Client/views/index.ejs`);
  // res.sendFile(`${__dirname}/index.html`);
});
