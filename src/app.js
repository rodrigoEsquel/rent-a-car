const express = require('express');
const { configureDI, configureCarRouter } = require('./config/di.js');

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.listen(port, () => {
  console.log(`⚡️ App listening on port ${port} ⚡️`);
});
