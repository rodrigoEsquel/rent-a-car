const express = require('express');
const morgan = require('morgan');
const {
  configureDI,
  configureCarRouter,
  configureCarTable,
} = require('./config/diContainer.js');

const app = express();

app.use('/public', express.static('public'));
app.use(morgan('tiny'));

const container = configureDI();
configureCarRouter(app, container);
configureCarTable(container);

module.exports = app;
