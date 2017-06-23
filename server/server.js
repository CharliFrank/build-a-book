/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(process.env.PORT || 3000, () => {
  console.warn('Server is listening on port: ', process.env.PORT || 3000);
});

module.exports = app;
