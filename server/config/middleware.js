const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');
  app.use(express.static(path.resolve('Client')));
};
