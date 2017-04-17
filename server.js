require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const user = process.env.USER;
const password = process.env.PASSWORD;
const app = express();
let db;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

MongoClient.connect('mongodb://' + user + ':' + password + '@ds161950.mlab.com:61950/build-a-book-db', (err, database) => {
  if (err) {
    console.error(err, 'Error');
  } else {
    console.log(typeof `${uri}`);
    db = database;
    app.listen(port, () => {
      console.log('Your server is working');
    });
  }
});

app.get('/', (req, res) => {
  console.log('Cash me outside! My get to / is working!');
  // res.render(`${__dirname}/Client/views/index.ejs`);
  res.sendFile(`${__dirname}/index.html`);
});
