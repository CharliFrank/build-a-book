const express = require('express');

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const app = express();
let db;

MongoClient.connect('mongodb://charlifrank:charlifrank1!@ds161950.mlab.com:61950/build-a-book-db', (err, database) => {
  if (err) {
    console.error(err, 'Error');
  } else {
    db = database;
    app.listen(port, () => {
      console.log('Your server is working');
    });
  }
});

app.get('/', (req, res) => {
  console.log('Cash me outside! My get to / is working!');
  res.sendFile(`${__dirname}/index.html`);
});
