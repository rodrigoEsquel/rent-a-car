const express = require('express');

const {
  configureDI,
  configureCarRouter,
  configureCarTable,
  configureViewRender,
  configureLog,
} = require('./config/diContainer.js');

const app = express();

app.use('/public', express.static('public'));

const container = configureDI();
configureCarRouter(app, container);
configureCarTable(container);
configureViewRender(app);
configureLog(app);

module.exports = app;
